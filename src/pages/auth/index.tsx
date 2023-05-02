import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '@/styles/Auth.module.css';
import Link from 'next/link';
import { emailRegex } from '@/utils';

const Auth: React.FC = () => {
  
  return (
    <div className={`container ${styles.authContainer}`}>
      <div className="row">
        <div className="column flex">
          <div className="d-flex justify-content-center mb-3">
            <h3 className="place-items-middle">Login</h3>
          </div>

          <div className="mb-3">
            <input
              type="email"
              name=""
              id="id-email"
              className="form-control"
              placeholder="email"
              autoComplete='off'
              pattern={emailRegex.source}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              name=""
              id="id-password"
              className="form-control"
              placeholder="password"
              minLength={6}
            />
          </div>

          <div className="d-grid mt-5 mb-3">
            <button className="btn btn-primary">Login</button>
          </div>

          <div className="d-grid">
            <button className="btn btn-outline-primary">
              Sing In With Google
            </button>
          </div>

          <div className="mt-5 d-flex justify-content-around">
            <small>Don&apos;t have an account?</small>
            <small>
              <Link href={"/auth/register"}>Create Account</Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Auth;
