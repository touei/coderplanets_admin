/*
 *
 * PermissionCell
 *
 */

import React from 'react'
import R from 'ramda'
import PropTypes from 'prop-types'
import shortid from 'shortid'

import { makeDebugger, isEmptyNil, isObject } from '../../utils'
import {
  Wrapper,
  Number,
  RootNumber,
  NoneText,
  Label,
  UnitText,
  NumberInfo,
  PermissionWrapper,
} from './styles'
/* eslint-disable no-unused-vars */
const debug = makeDebugger('c:PermissionCell:index')
/* eslint-enable no-unused-vars */

const valueIsObj = v => isObject(v)
const valueIsNotObj = R.complement(valueIsObj)

const objToArray = input =>
  Object.keys(input).map(key => {
    return { [key]: input[key] }
  })

const key = R.compose(R.head, R.keys)
const value = R.compose(R.head, R.values)

const CommunityPermissions = ({ data }) => {
  if (!data) return <div />
  const dataArray = objToArray(data)

  return (
    <React.Fragment>
      {dataArray.map(v => (
        <PermissionWrapper key={shortid.generate()}>
          <Label>{key(v)}: </Label>
          <NumberInfo>
            <Number>{R.length(R.keys(value(v)))}</Number>
            <UnitText>项</UnitText>
          </NumberInfo>
        </PermissionWrapper>
      ))}
    </React.Fragment>
  )
}

const RootPermissions = ({ data }) => {
  if (isEmptyNil(data)) return <div />
  const plength = R.keys(data)

  return (
    <PermissionWrapper>
      <Label>system: </Label>
      <NumberInfo>
        <RootNumber>{plength.length}</RootNumber>
        <UnitText>项</UnitText>
      </NumberInfo>
    </PermissionWrapper>
  )
}

const PermissionCell = ({ source, onClick }) => {
  const cmsps = source.cmsPassportString
  if (isEmptyNil(cmsps)) {
    return <NoneText>暂无</NoneText>
  }
  const pjson = JSON.parse(cmsps)
  const cdata = R.pickBy(valueIsObj, pjson)
  const rdata = R.pickBy(valueIsNotObj, pjson)

  return (
    <Wrapper onClick={onClick.bind(this, source)}>
      <CommunityPermissions data={cdata} />
      <RootPermissions data={rdata} />
    </Wrapper>
  )
}

PermissionCell.propTypes = {
  // https://www.npmjs.com/package/prop-types
  onClick: PropTypes.func.isRequired,
  source: PropTypes.object.isRequired,
}

PermissionCell.defaultProps = {}

export default PermissionCell
