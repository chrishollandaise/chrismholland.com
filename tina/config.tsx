import { defineConfig, type ScreenPlugin, type Client } from 'tinacms'
import React, { useState } from 'react'

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  'overwrite'

export default defineConfig({
  cmsCallback: (cms) => {
    const screenPlugin: ScreenPlugin = {
      __type: 'screen',
      name: 'Deploy',
      Icon: () => (
        <svg
          className='mr-2 h-6 w-auto opacity-80'
          xmlns='http://www.w3.org/2000/svg'
          width='1em'
          height='1em'
          viewBox='0 0 24 24'
        >
          <path
            fill='currentColor'
            d='m13.13 22.19l-1.63-3.83c1.57-.58 3.04-1.36 4.4-2.27zM5.64 12.5l-3.83-1.63l6.1-2.77C7 9.46 6.22 10.93 5.64 12.5M21.61 2.39S16.66.269 11 5.93c-2.19 2.19-3.5 4.6-4.35 6.71c-.28.75-.09 1.57.46 2.13l2.13 2.12c.55.56 1.37.74 2.12.46A19.1 19.1 0 0 0 18.07 13c5.66-5.66 3.54-10.61 3.54-10.61m-7.07 7.07c-.78-.78-.78-2.05 0-2.83s2.05-.78 2.83 0c.77.78.78 2.05 0 2.83c-.78.78-2.05.78-2.83 0m-5.66 7.07l-1.41-1.41zM6.24 22l3.64-3.64c-.34-.09-.67-.24-.97-.45L4.83 22zM2 22h1.41l4.77-4.76l-1.42-1.41L2 20.59zm0-2.83l4.09-4.08c-.21-.3-.36-.62-.45-.97L2 17.76z'
          />
        </svg>
      ),
      layout: 'fullscreen',
      Component: () => {
        const tinaCloudClient: Client = cms.api.tina

        const [deployStatus, setDeployStatus] = useState('idle')
        const [disable, setDisable] = useState(false)

        const triggerDeploy = async () => {
          setDeployStatus('triggering')
          setDisable(true)

          const response = await fetch('https://auth.chrismholland.com', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${tinaCloudClient.clientId}`
            }
          })

          if (!response.ok) {
            setDeployStatus('error')
            setTimeout(() => {
              setDeployStatus('idle')
              setDisable(false)
            }, 2000)
            throw new Error(
              `HTTP error ${response.status} ${response.statusText}`
            )
          } else {
            setTimeout(() => {
              setDeployStatus('idle')
              setDisable(false)
            }, 2000)
            setDeployStatus('success')
          }
        }

        return (
          <div
            style={{
              paddingLeft: '3rem',
              paddingRight: '3rem',
              paddingTop: '3rem'
            }}
          >
            <h3 className='font-sans text-2xl text-gray-700'>Deploy Changes</h3>
            <p className='block font-medium leading-5 text-gray-900'>
              This will trigger a deploy on the provider's CI system,{' '}
              <strong style={{ color: '#F87171' }}>
                only press this when you are ready to publish!
              </strong>
            </p>
            <div
              style={{
                paddingTop: '2rem',
                position: 'relative'
              }}
            >
              <p
                style={{
                  color: deployStatus === 'error' ? '#F87171' : '#34D399',
                  position: 'absolute'
                }}
              >
                {deployStatus === 'error' &&
                  'Error. Check the dev console for more information.'}
                {deployStatus === 'success' &&
                  'Success! Build has been triggered!'}
              </p>
              <button
                onClick={triggerDeploy}
                style={{ marginTop: '2rem' }}
                disabled={disable}
                className='icon-parent focus:shadow-outline inline-flex h-10 items-center justify-center rounded-full border-0 bg-blue-500 px-4 text-center text-sm  font-medium text-white shadow transition-all duration-150 ease-out hover:bg-blue-600 focus:outline-none focus:ring-2  focus:ring-blue-500 '
              >
                {(deployStatus === 'idle' ||
                  deployStatus === 'error' ||
                  deployStatus === 'success') && <span>Trigger Deploy</span>}
                {deployStatus === 'triggering' && <span>Deploying...</span>}
              </button>
            </div>
          </div>
        )
      }
    }
    if (!cms.api.tina.isLocalMode) {
      cms.plugins.add(screenPlugin)
    }

    cms.flags.set('branch-switcher', true)
    cms.flags.set('admin', true)

    return cms
  },

  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: 'admin',
    publicFolder: 'public'
  },
  media: {
    tina: {
      mediaRoot: 'src/assets',
      publicFolder: './'
    }
  },
  search: {
    tina: {
      indexerToken: process.env.TINA_INDEXER_TOKEN,
      stopwordLanguages: ['eng']
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100
  },

  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: 'misc',
        label: 'Other',
        path: 'src/content/misc',
        fields: [
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
      },
      {
        name: 'blog',
        label: 'Posts',
        path: 'src/content/blog',
        defaultItem: () => {
          return {
            layout: '../../layouts/PostLayout.astro',
            title: 'New Post',
            description: '',
            pubDate: new Date(),
            draft: true,
            tags: []
          }
        },
        fields: [
          {
            type: 'string',
            name: 'layout',
            label: 'Page Layout',
            ui: {
              component: 'select',
              //@ts-ignore
              options: ['../../layouts/PostLayout.astro']
            }
          },
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
            ui: {
              validate: (value, data) => {
                const lengthOfTitle = value?.length || 0
                if (lengthOfTitle > 60) {
                  return 'Keep title under or at 60 characters'
                }
              }
            }
          },
          {
            type: 'string',
            name: 'description',
            label: 'Description',
            required: true,
            ui: {
              validate: (value, data) => {
                const lengthOfDesc = value?.length || 0
                if (lengthOfDesc > 160) {
                  return 'Keep title under or at 160 characters'
                }
              }
            }
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
