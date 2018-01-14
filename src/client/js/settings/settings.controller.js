class SettingsCtrl {
  constructor(User, $state) {
    'ngInject';

    this._User = User;
    this._$state = $state;

    this.formData = {
      email: User.current.email,
      bio: User.current.bio,
      image: User.current.image,
      username: User.current.username,
      country: User.current.country
    }

    this.country = [{pais:"Spain"},{pais:"France"},{pais:"Italy"},{pais:"Portugal"}]
    this.logout = User.logout.bind(User);

  }

  submitForm() {
    this.isSubmitting = true;
    this._User.update(this.formData).then(
      (user) => {
        this._$state.go('app.profile.main', {username:user.username})
      },
      (err) => {
        this.isSubmitting = false;
        this.errors = err.data.errors;
      }
    )
  }

}

export default SettingsCtrl;
