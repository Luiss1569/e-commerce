import Submit from "../../components/atom/submit";
import AddressInput from "../../components/molecule/addressInputGrid";
import { UserCreate } from "@/interfaces/user";
import { MailOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import { Link, Navigate } from "react-router-dom";
import { memo, useEffect } from "react";
import Logo from "../../components/atom/logo";
import { useDispatch } from "react-redux";
import { create, resetStatus } from "../../store/user/actions";
import { useSelector } from "react-redux";
import { requestStatus } from "@/interfaces/interfaces";
import toastr from "toastr";

const RegisterComponent: React.FC = () => {
  const dispatch = useDispatch();
  const requestStatus: requestStatus = useSelector(
    (state: any) => state.user.status.create,
  );

  const onFinish = (values: any) => {
    values.addresses = values.addresses.map((address: any) => {
      return {
        ...address,
        city: {
          id: address.city,
          state: {
            id: address.state,
          },
        },
      };
    });
    dispatch(create(values));
  };

  useEffect(() => {
    if (requestStatus.success) {
      toastr.success("Success", "Usuário cadastrado com sucesso!");
      dispatch(resetStatus());
    }

    if (requestStatus.error) {
      toastr.error("Error", requestStatus.error);
      dispatch(resetStatus());
    }
  }, [requestStatus]);

  return (
    <div className="flex justify-center items-center md:h-screen h-auto">
      <div className="bg-blue-100 p-5 rounded-r-xl shadow-xl ">
        <div className="flex justify-center items-center mb-10">
          <h1
            className="text-blue-900 text-3xl"
            data-testid="title-create-user"
          >
            Criar Usúario
          </h1>
          <div>
            <Logo />
          </div>
        </div>
        <Form
          name="create"
          onFinish={onFinish}
          className="flex flex-col items-center"
          data-testid="form"
        >
          <div className="flex flex-1 gap-5 flex-wrap">
            <div className="p-5 pt-0 pb-0">
              <Form.Item label="Dados Usúario"></Form.Item>
              <Form.Item
                name="name"
                rules={[
                  { required: true, message: "Por favor preencha seu nome!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  type="name"
                  placeholder="Nome"
                  size="large"
                  data-testid="input-name"
                />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Por favor preencha seu email!" },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  type="email"
                  placeholder="Email"
                  size="large"
                  data-testid="input-email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Por favor preencha sua senha!",
                  },
                  {
                    min: 6,
                    warningOnly: true,
                    message: "A senha deve ter no mínimo 6 caracteres!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Senha"
                  size="large"
                  data-testid="input-password"
                />
              </Form.Item>

              <Form.Item
                name="password-confirm"
                rules={[
                  { required: true, message: "Por favor confirme sua senha!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "As senhas não coincidem, por favor verifique!",
                        ),
                      );
                    },
                  }),
                ]}
                dependencies={["password"]}
              >
                <Input
                  prefix={<LockOutlined />}
                  type="new-password"
                  placeholder="Confirmar"
                  size="large"
                  data-testid="input-password-confirm"
                />
              </Form.Item>
            </div>
            <div className="lg:overflow-y-auto overflow-hidden  lg:max-h-80 p-5 pt-0 pb-0">
              <AddressInput />
            </div>
          </div>
          <div className="min-w-max w-3/12">
            <Submit text="Criar Usúario" loading={requestStatus.loading} />
          </div>
          <p>
            <strong className="text-indigo-500">Ou</strong>{" "}
            <Link to="/login" data-testid="link-login">
              faça login
            </Link>
          </p>
        </Form>
      </div>
      {requestStatus.success && <Navigate to="/login" />}
    </div>
  );
};

export default memo(RegisterComponent);
