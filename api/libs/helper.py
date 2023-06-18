# -*- coding:utf-8 -*-
import re
import subprocess
import uuid
from datetime import datetime
from zoneinfo import available_timezones
import random
import string

from flask_restful import fields


def run(script):
    return subprocess.getstatusoutput('source /root/.bashrc && ' + script)


class TimestampField(fields.Raw):
    def format(self, value):
        return int(value.timestamp())


def email(email):
    # Define a regex pattern for email addresses
    pattern = r"^[\w\.-]+@([\w-]+\.)+[\w-]{2,}$"
    # Check if the email matches the pattern
    if re.match(pattern, email) is not None:
        return email

    error = ('{email} is not a valid email.'
             .format(email=email))
    raise ValueError(error)


def uuid_value(value):
    if value == '':
        return str(value)

    try:
        uuid_obj = uuid.UUID(value)
        return str(uuid_obj)
    except ValueError:
        error = ('{value} is not a valid uuid.'
                 .format(value=value))
        raise ValueError(error)


def timestamp_value(timestamp):
    try:
        int_timestamp = int(timestamp)
        if int_timestamp < 0:
            raise ValueError
        return int_timestamp
    except ValueError:
        error = ('{timestamp} is not a valid timestamp.'
                 .format(timestamp=timestamp))
        raise ValueError(error)


class str_len(object):
    """ Restrict input to an integer in a range (inclusive) """

    def __init__(self, max_length, argument='argument'):
        self.max_length = max_length
        self.argument = argument

    def __call__(self, value):
        length = len(value)
        if length > self.max_length:
            error = ('Invalid {arg}: {val}. {arg} cannot exceed length {length}'
                     .format(arg=self.argument, val=value, length=self.max_length))
            raise ValueError(error)

        return value


class float_range(object):
    """ Restrict input to an float in a range (inclusive) """
    def __init__(self, low, high, argument='argument'):
        self.low = low
        self.high = high
        self.argument = argument

    def __call__(self, value):
        value = _get_float(value)
        if value < self.low or value > self.high:
            error = ('Invalid {arg}: {val}. {arg} must be within the range {lo} - {hi}'
                     .format(arg=self.argument, val=value, lo=self.low, hi=self.high))
            raise ValueError(error)

        return value


class datetime_string(object):
    def __init__(self, format, argument='argument'):
        self.format = format
        self.argument = argument

    def __call__(self, value):
        try:
            datetime.strptime(value, self.format)
        except ValueError:
            error = ('Invalid {arg}: {val}. {arg} must be conform to the format {format}'
                     .format(arg=self.argument, val=value, lo=self.format))
            raise ValueError(error)

        return value


def _get_float(value):
    try:
        return float(value)
    except (TypeError, ValueError):
        raise ValueError('{0} is not a valid float'.format(value))


def supported_language(lang):
    if lang in ['en-US', 'zh-Hans']:
        return lang

    error = ('{lang} is not a valid language.'
             .format(lang=lang))
    raise ValueError(error)


def timezone(timezone_string):
    if timezone_string and timezone_string in available_timezones():
        return timezone_string

    error = ('{timezone_string} is not a valid timezone.'
             .format(timezone_string=timezone_string))
    raise ValueError(error)


def generate_string(n):
    letters_digits = string.ascii_letters + string.digits
    result = ""
    for i in range(n):
        result += random.choice(letters_digits)

    return result


def get_remote_ip(request):
    if request.headers.get('CF-Connecting-IP'):
        return request.headers.get('Cf-Connecting-Ip')
    elif request.headers.getlist("X-Forwarded-For"):
        return request.headers.getlist("X-Forwarded-For")[0]
    else:
        return request.remote_addr
