const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback(); //Zera o banco antes de começar o teste
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy(); //Desfaz conexão do teste com o bd
  })

  it('should ble able to create a new ONG', async () => {
    const response = await request(app).post('/ongs').send({  
        name: "APAD-MG",
        email: "contato@contato.com",
        whatsapp: "11111111111",
        city: "Minas Gerais",
        uf: "MG"
    })

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
    
  })
})