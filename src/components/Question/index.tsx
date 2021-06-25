import { ReactNode } from 'react'
import './style.scss'
import cx from 'classnames'

type QuestionProps = {
  author: {
    name: string;
    avatar: string;
  },
  content: string;
  children?: ReactNode;
  isAnswered?: boolean;
  isHighLighted?: boolean;
}

export function Question({
  author,
  content,
  isAnswered = false,
  isHighLighted = false,
  children
}: QuestionProps){
  
  return(
    <div className={cx(
      'question',
      { answered : isAnswered },
      { highlighted: isHighLighted && !isAnswered }
    )}>
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>

        <div>
          {children}
        </div>
      </footer>
    </div>
  )
}