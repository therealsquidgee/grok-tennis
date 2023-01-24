export class Player {
  constructor(id:number = -1, name:string = 'Undefined') {
    this.id = id;
    this.name = name;
  }
  
  id: number;
  name: string;
}