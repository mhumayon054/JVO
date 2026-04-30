export default {
    routes: [
      {
        method: 'POST',
        path: '/squad-brief-submissions/submit-and-notify',
        handler: 'squad-brief-submission.submitAndNotify',
        config: {
          auth: false,
        },
      },
    ],
  }