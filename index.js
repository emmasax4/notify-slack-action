const core = require('@actions/core');
const wait = require('./wait');

const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK;
const slack = require('slack-notify')(SLACK_WEBHOOK);

// most @actions toolkit packages have async methods
async function run() {
  try {
    let attachment = {};
    attachment.fallback = core.getInput('fallback', {
      required: false
    });
    attachment.color = core.getInput('color', {
      required: false
    });
    attachment.pretext = core.getInput('pretext', {
      required: false
    });
    attachment.author_name = core.getInput('author_name', {
      required: false
    });
    attachment.author_link = core.getInput('author_link', {
      required: false
    });
    attachment.author_icon = core.getInput('author_icon', {
      required: false
    });
    attachment.title = core.getInput('title', {
      required: false
    });
    attachment.title_link = core.getInput('title_link', {
      required: false
    });
    attachment.text = core.getInput('text', {
      required: true
    });
    attachment.image_url = core.getInput('image_url', {
      required: false
    });
    attachment.thumb_url = core.getInput('thumb_url', {
      required: false
    });
    attachment.footer = core.getInput('footer', {
      required: false
    });
    attachment.footer_icon = core.getInput('footer_icon', {
      required: false
    });

    slack.alert({
      text: `${process.env.GITHUB_REPOSITORY}/${process.env.GITHUB_WORKFLOW} to ${process.env.GITHUB_REF.split("/")[2]} triggered by ${process.env.GITHUB_ACTOR} (${process.env.GITHUB_EVENT_NAME})\n`,
      attachments: [attachment]
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run()