export default {
  routes: [
    {
      method: 'POST',
      path: '/ai-strategy-submissions/start',
      handler: 'ai-strategy-submission.start',
      config: { auth: false },
    },
    {
      method: 'POST',
      path: '/ai-strategy-submissions/:id/questionnaire',
      handler: 'ai-strategy-submission.submitQuestionnaire',
      config: { auth: false },
    },
    {
      method: 'GET',
      path: '/ai-strategy-submissions/:id',
      handler: 'ai-strategy-submission.findOne',
      config: { auth: false },
    },
    {
      method: 'POST',
      path: '/ai-strategy-submissions/:id/resend-email',
      handler: 'ai-strategy-submission.resendEmail',
      config: { auth: false },
    },
  ],
}
