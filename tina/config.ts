import { defineConfig } from 'tinacms'

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  'overwrite'

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: 'admin',
    publicFolder: 'src/pages'
  },
  media: {
    tina: {
      mediaRoot: 'src/assets',
      publicFolder: ''
    }
  },
  search: {
    tina: {
      indexerToken: '',
      stopwordLanguages: ['eng']
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: 'blog',
        label: 'Posts',
        path: 'src/content/blog',
        defaultItem: () => {
          return {
            title: 'New Post',
            description: '',
            pubDate: '',
            draft: true
          }
        },
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true
          },
          {
            type: 'string',
            name: 'description',
            label: 'Description',
            required: true
          },

          {
            type: 'datetime',
            name: 'pubDate',
            label: 'Publish Date',
            required: false
          },
          {
            type: 'boolean',
            name: 'draft',
            label: 'Draft?',
            required: true
          },
          {
            type: 'string',
            name: 'tags',
            label: 'Tags',
            list: true,
            ui: {
              component: 'tags'
            }
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
            parser: {
              type: 'mdx'
            }
          }
        ]
      }
    ]
  }
})
