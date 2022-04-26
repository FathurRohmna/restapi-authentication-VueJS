import { UserController } from './user/user.controller';
import { App } from "app";
import { AuthController } from "auth/auth.controller";
import { PirvateController } from "private/private.controller";
import { PublicController } from "public/public.controller";

const app = new App(
  [
    new AuthController(),
    new PirvateController(),
    new PublicController(),
    new UserController()
  ]
)

app.listen()
