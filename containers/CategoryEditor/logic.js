import R from 'ramda'

import {
  asyncRes,
  TYPE,
  makeDebugger,
  closePreviewer,
  $solver,
  castArgs,
} from '../../utils'
import S from './schema'
import SR71 from '../../utils/network/sr71'

const sr71$ = new SR71()
let sub$ = null

/* eslint-disable no-unused-vars */
const debug = makeDebugger('L:CategoryEditor')
/* eslint-enable no-unused-vars */

let categoryEditor = null

export const profileChange = R.curry((part, e) =>
  categoryEditor.updateCategory({
    [part]: e.target.value,
  })
)

export const mutateConfirm = () => {
  const requiredArgs = ['title']
  const args = { ...categoryEditor.categoryData }

  categoryEditor.markState({
    mutating: true,
  })
  const fargs = castArgs(args, requiredArgs)

  debug('fargs --> ', fargs)
  if (categoryEditor.isEdit) {
    return sr71$.mutate(
      S.updateCategory,
      castArgs(args, ['id', ...requiredArgs])
    )
  }
  return sr71$.mutate(S.createCategory, fargs)
}

export function cancleMutate() {
  categoryEditor.markState({
    category: {},
    isEdit: false,
  })
  closePreviewer()
}

const initEditData = editData => {
  categoryEditor.markState({
    category: editData,
    isEdit: true,
  })
}

export function cancleEdit() {
  categoryEditor.markState({
    category: {},
    isEdit: false,
  })
  /* closePreviewer() */
}
// ###############################
// Data & Error handlers
// ###############################
const DataSolver = [
  {
    match: asyncRes('createCategory'),
    action: () => {
      closePreviewer(TYPE.GATEGORIES_REFRESH)
    },
  },
  {
    match: asyncRes('updateCategory'),
    action: () => {
      closePreviewer(TYPE.GATEGORIES_REFRESH)
    },
  },
]

const ErrSolver = []

export function init(selectedStore, editData) {
  categoryEditor = selectedStore
  debug(categoryEditor)
  if (sub$) sub$.unsubscribe()
  sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))

  if (editData) {
    initEditData(editData)
  }
}

export function uninit() {
  cancleEdit()
  /* cancleLoading() */
}