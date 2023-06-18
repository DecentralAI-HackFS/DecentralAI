const translation = {
  title: '日志与标注',
  description: '日志记录了应用的运行情况，包括用户的输入和 AI 的回复。',
  dateTimeFormat: 'YYYY-MM-DD HH:mm',
  table: {
    header: {
      time: '时间',
      endUser: '用户',
      input: '输入',
      output: '输出',
      summary: '摘要',
      messageCount: '消息数',
      userRate: '用户反馈',
      adminRate: '管理员反馈',
    },
    pagination: {
      previous: '上一页',
      next: '下一页',
    },
    empty: {
      noChat: '未开始的对话',
      noOutput: '无输出',
      element: {
        title: '这里有人吗',
        content: '在这里观测和标注最终用户和 AI 应用程序之间的交互，以不断提高 AI 的准确性。您可以<testLink>试试</testLink> WebApp 或<shareLink>分享</shareLink>出去，然后返回此页面。',
      },
    },
  },
  detail: {
    time: '时间',
    conversationId: '对话 ID',
    promptTemplate: '前缀提示词',
    promptTemplateBeforeChat: '对话前提示词 · 以系统消息提交',
    annotationTip: '{{user}} 标记的改进回复',
    timeConsuming: '耗时',
    second: ' 秒',
    tokenCost: '花费 Token',
    loading: '加载中',
    operation: {
      like: '赞同',
      dislike: '反对',
      addAnnotation: '标记改进回复',
      editAnnotation: '编辑改进回复',
      annotationPlaceholder: '输入你希望 AI 回复的预期答案，这在今后可用于模型微调，持续改进文本生成质量。',
    },
  },
  filter: {
    period: {
      today: '今天',
      last7days: '过去 7 天',
      last4weeks: '过去 4 周',
      last3months: '过去 3 月',
      last12months: '过去 12 月',
      monthToDate: '本月至今',
      quarterToDate: '本季度至今',
      yearToDate: '本年至今',
      allTime: '所有时间',
    },
    annotation: {
      all: '全部',
      annotated: '已标注改进（{{count}} 项）',
      not_annotated: '未标注',
    },
  },
}

export default translation
