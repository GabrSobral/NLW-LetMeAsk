import { useHistory, useParams } from 'react-router-dom'

import { Button } from '../../components/Button'
import { Question } from '../../components/Question'
import { RoomCode } from '../../components/RoomCode'

import logoImg from '../../assets/images/logo.svg'
import checkImg from '../../assets/images/check.svg'
import answerSvg from '../../assets/images/answer.svg'
import deleteImg from '../../assets/images/delete.svg'
import { useRoom } from '../../hooks/useRoom'

import { database } from '../../services/firebase'

import '../../styles/room.scss'

type RoomParams = {
  id: string
}

export function AdminRoom(){
  const params = useParams<RoomParams>()
  const { push } = useHistory()
  const roomId = params.id
  
  const { questions, title } = useRoom(roomId)

  async function handleDeleteQuestion(questionId: string){
    if(window.confirm("Tem certeza que deseja excluir essa pergunta?")){
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }
  }
  async function handleEndRoom(){
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date()
    })

    push('/')
  }
  async function handleCheckQuestionAnswered(questionId: string){
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true
    })
  }
  async function handleHighlightQuestion(questionId: string){
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true
    })
  }
  

  return(
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="letmeask" />
          <div>
            <RoomCode code={roomId}/>
            <Button isOutlined onClick={handleEndRoom}>Encerrar Sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          { questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          { questions.map(question => (
            <Question 
              author={question.author} 
              content={question.content} 
              key={question.id}
              isAnswered={question.isAnswered}
              isHighLighted={question.isHighlighted}
            >
              { !question.isAnswered && (
                <>
                  <button 
                    type="button"
                    onClick={() => handleCheckQuestionAnswered(question.id)}
                  >
                    <img src={checkImg} alt='Marcar pergunta como respondida' />
                  </button>

                  <button 
                    type="button"
                    onClick={() => handleHighlightQuestion(question.id)}
                  >
                    <img src={answerSvg} alt='Dar destaque à pergunta' />
                  </button>
                </>
              ) }

              <button 
                type="button"
                onClick={() => handleDeleteQuestion(question.id)}
              >
                <img src={deleteImg} alt='Deletar pergunta' />
              </button>
            </Question>
          )) }
        </div>
        
      </main>
    </div>
  )
}