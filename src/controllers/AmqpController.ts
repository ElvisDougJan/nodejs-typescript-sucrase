import * as amqp from 'amqplib'
import { Request, Response } from 'express'
import connection from './../utils/ConnectionAMQP'

class AmqpController {
  public connecting (req: Request, res: Response): void {
    res.json('Ola')

    amqp.connect(connection)
      .then(conn =>
        conn.createChannel()
          .then(ch => {
            let q = 'hello'
            ch.assertQueue(q, { durable: false })
            ch.prefetch(1)
            console.log(' [*] Aguardando por mensagens do %s. Para sair pressione CTRL+C', q)
            ch.consume(q, msg => {
              console.log(' [x] Recebido %s', msg.content.toString())
            },
            { noAck: true })
          })
          .catch(err => console.log(err))
      )
      .catch(err => console.log(err))
  }
}

export default new AmqpController()
