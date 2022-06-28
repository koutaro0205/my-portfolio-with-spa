import { error } from './notifications';

export const handleAjaxError = (err) => {
  error('Something went wrong');
  console.log(`ERROR ! : ${err}`);
  console.error(err);
};

export const isEmptyObject = obj => Object.keys(obj) === 0;

export const loggedInNow = (loggedInUser) => {
  return Object.keys(loggedInUser) !== 0;
}
// export const LoginSuccessful = (user) => {
//   setLoggedInStatus("ログイン中");
//   setCurrentUser(user);
// }

// export const validateUser = () => {
//   const errors = [];
//   const regex = new RegExp(/\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i);
//   const existedUser = users.find((e) => e.email === user.email);

//   if (user.name === '') {
//     errors.push('名前を入力してください');
//   }

//   if (user.email === '') {
//     errors.push("メールアドレスを入力してください");
//   }

//   if (user.email === existedUser.email) {
//     errors.push("入力されたメールアドレスは既に使われています。");
//   }

//   if (regex.test(user.email)) {
//     errors.push("正規表現パターンに一致していません。");
//   }

//   if (user.password === '' || user.password.length < 6 || user.password_confirmation === '' || user.password_confirmation.length < 6) {
//     errors.push('パスワードを6文字以上で入力してください');
//   }

//   if (user.password_confirmation !== user.password) {
//     errors.push("入力されたパスワードが一致しません");
//   }

//   return errors;
// };