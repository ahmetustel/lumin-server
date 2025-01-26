describe('Login Flow', () => {
  it('should navigate to login page', () => {
    cy.visit('http://localhost:3001/login');
    cy.contains('Giriş Yap');
  });

  it('should fail with wrong credentials', () => {
    cy.visit('http://localhost:3001/login');
    cy.get('input[placeholder="Kullanıcı Adı"]').type('wrong');
    cy.get('input[placeholder="Şifre"]').type('wrong');
    cy.get('button').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Giriş başarısız!');
    });
  });

  // Örnek: Başarılı giriş
  it('should login successfully with correct credentials', () => {
    cy.visit('http://localhost:3001/login');
    cy.get('input[placeholder="Kullanıcı Adı"]').type('user0'); // admin user
    cy.get('input[placeholder="Şifre"]').type('secret'); // gerçekte data servise göre
    cy.get('button').click();
    cy.url().should('include', '/application');
  });
});
