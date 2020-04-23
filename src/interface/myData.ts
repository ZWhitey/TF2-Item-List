import Item from './Item';
import Unusual from './Unusual';
import Paint from './paint'

export default interface MyData{
    Items: Item[];
    Paints: Paint[]; 
    UnusualEn:Unusual[];
    UnusualTw:Unusual[];
}