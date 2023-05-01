import { Formik, Form, Field, ErrorMessage } from "formik";
import { useCookies } from "react-cookie";
import axios from "axios";

function Auth(props) {
  const { setHasToken } = props;
  const [, setCookie] = useCookies(["token"]);

  return (
    <Formik
      initialValues={{ login: "", password: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.login) {
          errors.login = "Login required";
        }
        if (!values.password) {
          errors.password = "Password required";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        axios
          .post(`${process.env.REACT_APP_BACKEND_URL}/users`, {
            login: values.login,
            password: values.password,
          })
          .then((res) => {
            setCookie("token", res.data.token, { path: "/" });
            setHasToken(true);
          })
          .catch(console.log);
      }}
    >
      {({ isSubmitting }) => (
        <Form style={{ width: "10%" }} className="container mt-5">
          <div className="row">
            <label>Login:</label>
            <Field type="login" name="login" />
            <ErrorMessage name="login" component="div" />
          </div>
          <div className="row">
            <label>Password:</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
          </div>

          <button className="mt-2" type="submit" disabled={isSubmitting}>
            Sign in
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default Auth;
