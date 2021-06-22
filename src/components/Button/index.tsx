import { ButtonHTMLAttributes } from 'react'
import './style.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  type: string;
}

export function Button(props : ButtonProps){
  return(
    <button className="button" {...props}/>
  )
}