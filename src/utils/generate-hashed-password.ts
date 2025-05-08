import { hashPassword } from '@/libs/login/manage-login';

(async () => {
  const minhaSenha = '';
  const hashDaSenhaBase64 = await hashPassword(minhaSenha);

  console.log(hashDaSenhaBase64);
})();
