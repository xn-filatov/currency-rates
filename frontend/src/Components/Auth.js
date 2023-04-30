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
          .post(
            `${process.env.REACT_APP_BACKEND_URL}/users/${values.login}/${values.password}`
          )
          .then((res) => {
            setCookie("token", res.data.token, { path: "/" });
            setHasToken(true);
          })
          .catch(console.log);
      }}
    >
      {({ isSubmitting }) => (
        <Form style={{ marginTop: "10%" }}>
          <label>Login:</label>
          <Field type="login" name="login" />
          <ErrorMessage name="login" component="div" />
          <label>Password:</label>
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default Auth;
