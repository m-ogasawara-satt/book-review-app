describe('LoginForm Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000') // テストしたいページのURLを入力
    cy.window().then((win) => {
      cy.spy(win.console, 'log');
    });
  })

  it('checks email and password inputs', () => {
    const testEmail = 'test@example.com';
    const testPassword = 'password123';

    // emailとpasswordの入力フィールドに値を入力
    cy.get('input[name=email]').type(testEmail);
    cy.get('input[name=password]').type(testPassword);

    // フォームを送信します
    cy.get('form').submit();

    // emailとpasswordが正しく送信されたかを確認
    cy.window().then((win) => {
      expect(win.console.log).to.have.been.calledWith(`Email: ${testEmail}, Password: ${testPassword}`);
    });
  })
  it('shows an error when the email is invalid', () => {
    const invalidEmail = 'invalid email';
    const testPassword = 'password123';
  
    // emailとpasswordの入力フィールドに値を入力
    cy.get('input[name=email]').type(invalidEmail);
    cy.get('input[name=password]').type(testPassword);
  
    // フォームを送信します
    cy.get('form').submit();
  
    // エラーメッセージが表示されていることを確認
    cy.get('.error-message').should('be.visible');
  })
})
