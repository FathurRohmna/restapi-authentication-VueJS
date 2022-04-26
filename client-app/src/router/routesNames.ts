export interface IRoutesNames {
  public: string

  login: string
  register: string

  dashboard: string
}

const routesNames: Readonly<IRoutesNames> = {
  public: "public",
  
  login: "login",
  register: "register",

  dashboard: "dashboard"
}

export default routesNames
