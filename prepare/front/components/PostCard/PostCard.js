import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Router } from 'next/router';
import Link from 'next/link';

import style from '../../styles/css/postCard.module.css';

import PostImages from '../PostCard/PostImage';
import PostIcon from '../PostCard/PostIcon';
import PostContent from '../PostCard/PostContent';
import PostComment from '../PostCard/PostComment';
import PostCardSetButton from './postCardMore/PostCardSetButton';

const PostCard = ({ post }) => {
  const { me } = useSelector((state) => state.user);
  const id = useSelector((state) => state.user.me && state.user.me.id);

  useEffect(() => {
    if (!me) {
      Router.push('/');
    }
  }, [me]);

  return (
    <section className={style.a}>
      <article className={style.maxWidth}>
        <div className={style.postCard}>
          <div className={style.postHead}>
            <header>
              <div>
                <Link href={`/user/${post.User.id}`}>
                  {/* <Link href={`/user/${post.MEN_ID}`}> */}
                  <a>{<img src="/icon/profle_img.png" />}</a>
                </Link>
              </div>
              <div>
                <Link href={`/user/${post.User.id}`}>
                  {/* <Link href={`/user/${post.MEN_ID}`}> */}
                  <a>{`${post.User.nickname}`}</a>
                  {/* <a>{`${post.MEN_NICKNAME}`}</a> */}
                </Link>
              </div>

              {/* <div>{id ? null : true ? '팔로우' : '언팔로우'}</div> */}
            </header>
            <PostCardSetButton post={post} />
            {/* {true ?  : null} */}
          </div>

          <div className={style.postImage}>
            <div>
              {post?.Images.length > 0 && <PostImages images={post.Images} />}
              {/* 다시한번 확인하기 */}
              {/* {post?.BO_IMG > 0 && <PostImages images={post.BO_IMG} />} */}
              {/* <PostImages images={post.Images} /> */}
            </div>
          </div>

          <div className={style.postIcon}>
            <PostIcon post={post} />
          </div>

          <div className={style.postContent}>
            <PostContent post={post} />
          </div>
          <div className={style.postComment}>
            <PostComment post={post} />
          </div>
        </div>
      </article>
    </section>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
    Retweet: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};

export default PostCard;
