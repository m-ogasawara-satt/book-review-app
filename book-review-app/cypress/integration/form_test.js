describe('LoginForm Test', () => {
  beforeEach(() => {
    cy.visit('/') // テストしたいページのURLを入力します
    cy.window().then((win) => {
      cy.spy(win.console, 'log');
    });
  })

  it('checks email and password inputs', () => {
    const testEmail = 'test@example.com';
    const testPassword = 'password123';

    // emailとpasswordの入力フィールドに値を入力します
    cy.get('input[name=email]').type(testEmail);
    cy.get('input[name=password]').type(testPassword);

    // フォームを送信します
    cy.get('form').submit();

    // ここで、emailとpasswordが正しく送信されたかを確認します。
    // これは、console.logの出力に基づいて行います。
    cy.window().then((win) => {
      expect(win.console.log).to.have.been.calledWith(`Email: ${testEmail}, Password: ${testPassword}`);
    });
  })
})
