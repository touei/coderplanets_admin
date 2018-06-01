/*
 *
 * CommunitySetter
 *
 */

import React from 'react'
import R from 'ramda'
import { inject, observer } from 'mobx-react'
import shortid from 'shortid'

// import Link from 'next/link'

import { makeDebugger, storePlug } from '../../utils'
import { Pagi } from '../../components'
import * as logic from './logic'

import {
  Wrapper,
  Divider,
  CategoryWrapper,
  CategoryTag,
  CommunityLogo,
  SetterTitle,
} from './styles'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('C:CommunitySetter')
/* eslint-enable no-unused-vars */

const CommunitiesList = ({ part, source, communities, selectedids }) => {
  return (
    <CategoryWrapper>
      {communities.map(c => (
        <CategoryTag
          key={shortid.generate()}
          active={R.contains(c.id, selectedids)}
          onClick={logic.setCommunity.bind(this, part, source.id, c.id)}
        >
          <CommunityLogo src={c.logo} />
          {c.title}
        </CategoryTag>
      ))}
    </CategoryWrapper>
  )
}

class CommunitySetterContainer extends React.Component {
  componentWillMount() {
    logic.init(this.props.communitySetter)
  }

  render() {
    const { communitySetter, editData } = this.props
    const { pagedCommunitiesData } = communitySetter
    const { part } = editData

    const source = editData.data
    const selectedids = R.pluck('id', source.communities)

    return (
      <Wrapper>
        <SetterTitle>{source.title}</SetterTitle>
        <h2>设置社区</h2>
        <Divider />
        {pagedCommunitiesData ? (
          <React.Fragment>
            <CommunitiesList
              part={part}
              source={source}
              communities={pagedCommunitiesData.entries}
              selectedids={selectedids}
            />
            <Divider />
            <div>
              <Pagi
                pageNumber={pagedCommunitiesData.pageNumber}
                pageSize={pagedCommunitiesData.pageSize}
                totalCount={pagedCommunitiesData.totalCount}
                onChange={logic.getAllCommunities}
              />
            </div>
          </React.Fragment>
        ) : (
          <div />
        )}
      </Wrapper>
    )
  }
}

export default inject(storePlug('communitySetter'))(
  observer(CommunitySetterContainer)
)