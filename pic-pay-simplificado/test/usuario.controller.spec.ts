import { Test, TestingModule } from "@nestjs/testing"
import { UsuariosDto } from "src/usuarios/dto/usuarios.dto"
import { TipoUsuario } from "src/usuarios/enum/usuarios.enum"
import { UsuariosController } from "src/usuarios/usuarios.controller"
import { UsuariosService } from "src/usuarios/usuarios.service"
import { Response } from "express"
import { AuthGuard } from "src/auth/auth.guard"



describe("UsuariosController", () => {
  let controller: UsuariosController;
  let service: UsuariosService;

  const mockResponse = (): Partial<Response> => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  
  const mockAuthGuard = { canActivate: jest.fn(() => true) };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuariosController],
      providers: [
        {
          provide: UsuariosService,
          useValue: {
            postUsuario: jest.fn(),
          },
        },
      ],
    })
    .overrideGuard(AuthGuard)
    .useValue(mockAuthGuard)
    .compile();

    controller = module.get<UsuariosController>(UsuariosController);
    service = module.get<UsuariosService>(UsuariosService);
  });

  it("deve criar um usuário com sucesso", async () => {
    const res = mockResponse();
    const dto: UsuariosDto = {
      nome_completo: "Thiago",
      email: "teste@gmail.com",
      cpf: "11111111111",
      senha: "12345",
      saldo: 1000,
      tipo_usuario: TipoUsuario.PADRAO,
    };

    jest.spyOn(service, "postUsuario").mockResolvedValueOnce();

    await controller.criaUsuario(dto, res as Response);

    expect(service.postUsuario).toHaveBeenCalledWith(dto);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith("Usuário criado com sucesso");
  });

  it("deve retornar erro caso o service lance exceção", async () => {
    const res = mockResponse();
    const dto = { nome_completo: "Thiago" } as any;

    jest.spyOn(service, "postUsuario").mockRejectedValueOnce(new Error("Usuário já cadastrado"));

    await controller.criaUsuario(dto, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith("Usuário já cadastrado");
  });
});