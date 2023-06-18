const translation = {
  pageTitle: "提示词编排",
  operation: {
    applyConfig: "发布",
    resetConfig: "重置",
    addFeature: "添加功能",
    stopResponding: "停止响应",
  },
  notSetAPIKey: {
    title: "LLM 提供者的密钥未设置",
    trailFinished: "试用已结束",
    description: "在调试之前需要设置 LLM 提供者的密钥。",
    settingBtn: "去设置",
  },
  trailUseGPT4Info: {
    title: '当前不支持使用 gpt-4',
    description: '使用 gpt-4，请设置 API Key',
  },
  feature: {
    groupChat: {
      title: '聊天增强',
      description: '为聊天型应用添加预对话设置，可以提升用户体验。'
    },
    groupExperience: {
      title: '体验增强',
    },
    conversationOpener: {
      title: "对话开场白",
      description: "在对话型应用中，让 AI 主动说第一段话可以拉近与用户间的距离。"
    },
    suggestedQuestionsAfterAnswer: {
      title: '下一步问题建议',
      description: '设置下一步问题建议可以让用户更好的对话。',
      resDes: '回答结束后系统会给出 3 个建议',
      tryToAsk: '试着问问',
    },
    moreLikeThis: {
      title: "更多类似的",
      description: '一次生成多条文本，可在此基础上编辑并继续生成',
      generateNumTip: "每次生成数",
      tip: "使用此功能将会额外消耗 tokens"
    },
    dataSet: {
      title: "上下文",
      noData: "您可以导入数据集作为上下文",
      words: "词",
      textBlocks: "文本块",
      selectTitle: "选择引用数据集",
      selected: "个数据集被选中",
      noDataSet: "未找到数据集",
      toCreate: "去创建",
      notSupportSelectMulti: '目前只支持引用一个数据集'
    }
  },
  resetConfig: {
    title: "确认重置？",
    message: "重置将丢失当前页面所有修改，恢复至上次发布时的配置",
  },
  errorMessage: {
    nameOfKeyRequired: "变量 {{key}} 对应的名称必填",
    valueOfVarRequired: "变量值必填",
    queryRequired: "主要文本必填",
    waitForResponse: "请等待上条信息响应完成",
  },
  chatSubTitle: "对话前提示词",
  completionSubTitle: "前缀提示词",
  promptTip:
    "提示词用于对 AI 的回复做出一系列指令和约束。可插入表单变量，例如 {{input}}。这段提示词不会被最终用户所看到。",
  formattingChangedTitle: "编排已改变",
  formattingChangedText: "修改编排将重置调试区域，确定吗？",
  variableTitle: "变量",
  notSetVar: "变量能使用户输入表单引入提示词或开场白，你可以试试在提示词中输入输入 {{input}}",
  variableTip:
    "变量将以表单形式让用户在对话前填写，用户填写的表单内容将自动替换提示词中的变量。",
  autoAddVar: "提示词中引用了未定义的变量，是否自动添加到用户输入表单中？",
  variableTable: {
    key: "变量 Key",
    name: "字段名称",
    optional: "可选",
    type: "类型",
    action: "操作",
    typeString: "文本",
    typeSelect: "下拉选项",
  },
  varKeyError: {
    canNoBeEmpty: "变量不能为空",
    tooLong: "变量: {{key}} 长度太长。不能超过 16 个字符",
    notValid: "变量: {{key}} 非法。只能包含英文字符，数字和下划线",
    notStartWithNumber: "变量: {{key}} 不能以数字开头",
  },
  variableConig: {
    modalTitle: "变量设置",
    description: "设置变量 {{varName}}",
    fieldType: '字段类型',
    string: '文本',
    select: '下拉选项',
    notSet: '未设置，在 Prompt 中输入 {{input}} 试试',
    stringTitle: "文本框设置",
    maxLength: "最大长度",
    options: "选项",
    addOption: "添加选项",
  },
  openingStatement: {
    title: "对话开场白",
    add: "添加开场白",
    writeOpner: "编写开场白",
    placeholder: "请在这里输入开场白",
    noDataPlaceHolder:
      "在对话型应用中，让 AI 主动说第一段话可以拉近与用户间的距离。",
    varTip: '你可以使用变量， 试试输入 {{variable}}',
    tooShort: "对话前提示词至少 20 字才能生成开场白",
    notIncludeKey: "前缀提示词中不包含变量 {{key}}。请在前缀提示词中添加该变量",
  },
  modelConfig: {
    model: "语言模型",
    setTone: "模型设置",
    title: "模型及参数",
  },
  inputs: {
    title: "调试与预览",
    noPrompt: "尝试在对话前提示框中编写一些提示词",
    userInputField: "用户输入",
    noVar: "填入变量的值，每次启动新会话时该变量将自动替换提示词中的变量。",
    chatVarTip: "填入变量的值，该值将在每次开启一个新会话时自动替换到提示词中",
    completionVarTip: "填入变量的值，该值将在每次提交问题时自动替换到提示词中",
    previewTitle: "提示词预览",
    queryTitle: "查询内容",
    queryPlaceholder: "请输入文本内容",
    run: "运行",
  },
  result: "结果",
};

export default translation;
