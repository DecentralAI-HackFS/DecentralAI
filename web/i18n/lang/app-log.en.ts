const translation = {
  title: 'Logs & Annotations',
  description: 'The logs record the running status of the application, including user inputs and AI replies.',
  dateTimeFormat: 'MM/DD/YYYY hh:mm A',
  table: {
    header: {
      time: 'Time',
      endUser: 'End User',
      input: 'Input',
      output: 'Output',
      summary: 'Summary',
      messageCount: 'Message Count',
      userRate: 'User Rate',
      adminRate: 'Op. Rate',
    },
    pagination: {
      previous: 'Prev',
      next: 'Next',
    },
    empty: {
      noChat: 'No conversation yet',
      noOutput: 'No output',
      element: {
        title: 'Is anyone there?',
        content: 'Observe and annotate interactions between end-users and AI applications here to continuously improve AI accuracy. You can try <shareLink>sharing</shareLink> or <testLink>testing</testLink> the Web App yourself, then return to this page.',
      },
    },
  },
  detail: {
    time: 'Time',
    conversationId: 'Conversation ID',
    promptTemplate: 'Prompt Template',
    promptTemplateBeforeChat: 'Prompt Template Before Chat · As System Message',
    annotationTip: 'Improvements Marked by {{user}}',
    timeConsuming: '',
    second: 's',
    tokenCost: 'Token spent',
    loading: 'loading',
    operation: {
      like: 'like',
      dislike: 'dislike',
      addAnnotation: 'Add Improvement',
      editAnnotation: 'Edit Improvement',
      annotationPlaceholder: 'Enter the expected answer that you want AI to reply, which can be used for model fine-tuning and continuous improvement of text generation quality in the future.',
    },
  },
  filter: {
    period: {
      today: 'Today',
      last7days: 'Last 7 Days',
      last4weeks: 'Last 4 weeks',
      last3months: 'Last 3 months',
      last12months: 'Last 12 months',
      monthToDate: 'Month to date',
      quarterToDate: 'Quarter to date',
      yearToDate: 'Year to date',
      allTime: 'All time',
    },
    annotation: {
      all: 'All',
      annotated: 'Annotated Improvements ({{count}} items)',
      not_annotated: 'Not Annotated',
    },
  },
}

export default translation
