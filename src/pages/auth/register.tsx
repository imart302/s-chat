import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '@/styles/Auth.module.css';
import React from 'react';
import Link from 'next/link';

import { useForm, SubmitHandler } from 'react-hook-form';

interface IRegisterInputs {
  email: string;
  username: string;
  password: string;
  repeatPassword: string;
}

const Register: React.FC = () => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm<IRegisterInputs>();

  const onSubmit: SubmitHandler<IRegisterInputs> = (data) => {
    console.log(errors);
    console.log(data);
  }

  return (
    <div className={`container ${styles.authContainer}`}>
      <div className="row">
        <div className="column flex">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="d-flex justify-content-center mb-3">
              <h3 className="place-items-middle">Register</h3>
            </div>

            <div className="mb-3">
              <input
                type="text"
                id="id-username"
                className="form-control is-invalid"
                placeholder="username"
                autoComplete='off'
                {...register('username')}
              />
            </div>

            <div className="mb-3">
              <input
                type="email"
                id="id-email"
                className="form-control"
                placeholder="email"
                autoComplete='off'
                {...register('email')}
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                id="id-password"
                className="form-control"
                placeholder="password"
                minLength={6}
                {...register('password')}
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                id="id-password-r"
                className="form-control"
                placeholder="repeat password"
                minLength={6}
                {...register('repeatPassword')}
              />
            </div>

            <div className="d-grid mt-5 mb-3">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </form>

          <div className="d-grid">
            <button className="btn btn-outline-primary">
              Enter with Google
            </button>
          </div>

          <div className="mt-5 d-flex justify-content-around">
            <small>Already have an account? </small>
            <small>
              <Link href={'/auth'}>Sign In</Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
