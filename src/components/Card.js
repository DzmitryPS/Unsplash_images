import React, {Fragment} from 'react'


const Card = ({photo}) => {

    const { user, urls } = photo;

    return (
    <Fragment>
      <img className="img" src={urls.regular} />
      <a
        className="credit"
        target="_blank"
        href={`https://unsplash.com/@${user.username}`}
      >
        {user.name}
      </a>
    </Fragment>
    )
}

export default Card;
