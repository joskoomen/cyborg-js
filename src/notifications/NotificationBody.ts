export class NotificationBody {
  notification: string
  payload: Record<string, any>

  constructor(pType: string, pPayload?: Record<string, any>) {
    this.notification = pType
    this.payload = pPayload || {}
  }
}
