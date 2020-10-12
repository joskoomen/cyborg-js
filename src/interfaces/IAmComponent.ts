import ICanBind from './ICanBind';
import ICanDestroy from './ICanDestroy';
import ICanHandleNotifications from './ICanHandleNotifications';
import ICanHandleEvents from './ICanHandleEvents';
import ICanNotify from './ICanNotify';

export default interface IAmComponent
  extends ICanBind,
    ICanDestroy,
    ICanHandleNotifications,
    ICanNotify,
    ICanHandleEvents {

  onload(): void;

  onunload(): void;
}
