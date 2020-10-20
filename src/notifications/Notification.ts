import { ICanHandleNotifications } from '../interfaces/ICanHandleNotifications'

export class Notification {
  readonly name: string
  readonly target: ICanHandleNotifications
  readonly handler: Function

  constructor(
    pTarget: ICanHandleNotifications,
    pName: string,
    pHandler: Function
  ) {
    this.name = pName
    this.handler = pHandler
    this.target = pTarget
  }
}
