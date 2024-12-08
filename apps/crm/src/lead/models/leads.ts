export class Lead {
  constructor(
    public id?: string,
    public projectId: string = "",
    public name: string = "desconhecido",
    public telefone: string = "sem telefone",
    public email: string = "sem email",
    public position?: string,
    public state?: string,
    public city?: string,
    public data?: any
  ) { }
}