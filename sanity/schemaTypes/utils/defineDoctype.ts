import {defineType} from 'sanity'
import {definePageType} from '@q42/sanity-plugin-page-tree'
import {pageTreeConfig} from '../../pageTreeConfig'

const baseGroups = [
  {
    name: 'content',
    title: 'Content',
    default: true,
  },
  {
    name: 'seo',
    title: 'SEO',
  },
  {
    name: 'settings',
    title: 'Settings',
  },
]

type Group = {name: string; title: string; default?: boolean}

export function defineDoctype(
  config: any,
  pageTreeOptions?: {isRoot?: boolean},
  extraGroups?: Group[],
) {
  const groups = extraGroups
    ? [baseGroups[0], ...extraGroups, baseGroups[1], baseGroups[2]]
    : baseGroups

  const type = defineType({...config, type: 'document', groups})
  const withPageTree = definePageType(type, pageTreeConfig, pageTreeOptions)
  return {
    ...withPageTree,

    fields: withPageTree.fields.map((f: any) =>
      'group' in f && f.group ? f : {...f, group: 'settings'},
    ),
  }
}
