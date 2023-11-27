import ky from "ky";
import { authHandler, isLogged, updateTokens } from "./auth";

const ENVIRONMENT = process.env.REACT_APP_BASE_ENVIRONMENT;

const SALES_FORCE_LIST = {
  production: {
    username: "integracao.crm@loovi.com.br",
    password: "loovi@17280s1LP7zmZGoKFJpiAJQX2fG9H",
    client_id:
      "3MVG9IHf89I1t8hpuL9A.BfbxsT9pSMbC3kNzf0DHp6FHOgjkM7A2ISwH0611.goGEsEtgOyEsZlUHYVf7C.3",
    client_secret:
      "D73B65810955E8FD5399D61C8B994D363C8C31C1C51BF35E60CD5717D667475B",
  },
  staging: {
    username: "integracao.crm@loovi.com.br.parcial",
    password: "loovi@17280XGujN07sNdVLgBHMlrXFiUj9",
    client_id:
      "3MVG98dostKihXN6pDtnX4XGuU9UO9CgW7g18dFvISRhXM4ehemQWLuyUrEJYmJImDPXtU.qxj_0v8IqhQ8QR",
    client_secret:
      "8ECC4B9808730BAB763D5A598485C5077ED01261DFFBFAA320290395BDA49353",
  },
  development: {
    username: "integracao.crm@loovi.com.br.service",
    password: "loovi@17280piegMcYEfpLS6xwGnKYkI4aK",
    client_id:
      "3MVG9er.T8KbeePSigh_V9Zf6_JAxTnritZmUrzLHVyU.inY59fJ.iwwx5crlK1Kv4.Vif6hctJsI8x.tWu6b%0A",
    client_secret:
      "BD6D7C876C47C33BADF4925757FE48594B8579E840C28726CE969B4F49A38974",
  },
};

export const SALES_FORCE = SALES_FORCE_LIST[ENVIRONMENT];

const URLS_LIST = {
  production: {
    ALERTA_MOVIMENTO:
      "https://y3gt027i83.execute-api.us-east-1.amazonaws.com/producao/alerta-movimento/v1",
    AUTENTICACAO:
      "https://e2ib2uw05e.execute-api.us-east-1.amazonaws.com/producao/autenticacao/v1",
    COMANDOS:
      "https://l16zl3rgu1.execute-api.us-east-1.amazonaws.com/producao/comandos/v1",
    CONTRATOS:
      "https://6w565xshe2.execute-api.us-east-1.amazonaws.com/producao/contratos/v1",
    CORREIOS:
      "https://420bo6cvjf.execute-api.us-east-1.amazonaws.com/producao/correios/v1",
    DADOS_CLIENTE:
      "https://jhnw1is8x6.execute-api.us-east-1.amazonaws.com/producao/dados-cliente/v1",
    EVENTOS:
      "https://udq12ux09b.execute-api.us-east-1.amazonaws.com/producao/eventos/v1",
    FOTOS:
      "https://yur7hx8iwa.execute-api.us-east-1.amazonaws.com/producao/fotos/v3",
    LOCALIZACAO:
      "https://x34s8k0vlg.execute-api.us-east-1.amazonaws.com/producao/localizacao/v1",
    NOTIFICACAO_PUSH:
      "https://2sdq45babc.execute-api.us-east-1.amazonaws.com/producao/notificacao-push/v1",
    DEVICE_TOKEN:
      "https://2bkkkezamk.execute-api.us-east-1.amazonaws.com/producao/device-token/v1",
    PLACAS:
      "https://610ex5gm6i.execute-api.us-east-1.amazonaws.com/producao/placas/v1",
    PLUGUE:
      "https://b1nx1iqtza.execute-api.us-east-2.amazonaws.com/staging/plugue/por-imei",
    SMS: "https://8ntcl8bbh9.execute-api.us-east-1.amazonaws.com/producao/sms/v1",
    STATUS_FOTOS:
      "https://m5k3346yqa.execute-api.us-east-1.amazonaws.com/producao/status-fotos/v1",
    USUARIO:
      "https://af3ee145ee.execute-api.us-east-1.amazonaws.com/producao/usuario/v1",
    VIAGENS:
      "https://58z3125kj1.execute-api.us-east-1.amazonaws.com/producao/viagens/v1",
    CPF_CNPJ:
      "https://wczo319lv9.execute-api.us-east-1.amazonaws.com/producao/cpf-cnpj/v1",
    TELEFONIA:
      "https://bzcko0e8te.execute-api.us-east-1.amazonaws.com/producao/telefonia/v1",
    FURTO_ROUBO:
      "https://vkq68jlj70.execute-api.us-east-1.amazonaws.com/producao/furto-roubo/v1",
    SAP: "https://sapiis.loovi.com.br:30000/Api/Loovi",
    MAGIC:
      "https://magic.loovi.com.br/Magicxpi/MgWebRequester.dll?appname=IFSLOOVI&prgname=HTTP&arguments=-AHTTP_XPI%23",
    EMAIL:
      "https://ngsjtcjxhg.execute-api.us-east-2.amazonaws.com/staging/email",
    SFTOKEN: "https://loovi-salesforce.sevn.technology/salesforce/get-token",
    POST_CALL: "https://loovi-salesforce.sevn.technology/salesforce/post-call",
    WEBTOLEAD:
      "https://loovi-salesforce.sevn.technology/salesforce/submit-lead",
    WEBTOCASE:
      "https://loovi-salesforce.sevn.technology/salesforce/submit-case",
    URLPROXY:
      "https://13zf6u0h69.execute-api.us-east-1.amazonaws.com/producao/proxy/v1",
    SAPFATURA: 'https://sapiis.loovi.com.br:60000/fatura/api/v1',
  },
  staging: {
    ALERTA_MOVIMENTO:
      "https://jlvufszw56.execute-api.us-east-2.amazonaws.com/staging/alerta-movimento",
    AUTENTICACAO:
      "https://s49norn92g.execute-api.us-east-2.amazonaws.com/staging/autenticacao",
    COMANDOS:
      "https://nw59v0arf4.execute-api.us-east-2.amazonaws.com/staging/comandos",
    CONTRATOS:
      "https://54w57ac3zj.execute-api.us-east-2.amazonaws.com/staging/contratos",
    CORREIOS:
      "https://95zdotrtta.execute-api.us-east-2.amazonaws.com/staging/correios",
    DADOS_CLIENTE:
      "https://3rmxdzil3j.execute-api.us-east-2.amazonaws.com/staging/dados-cliente",
    EVENTOS:
      "https://41yvvpi8uc.execute-api.us-east-2.amazonaws.com/staging/eventos",
    FOTOS:
      "https://g0i8mlo8cb.execute-api.us-east-2.amazonaws.com/staging/fotos",
    LOCALIZACAO:
      "https://xn0hd8jr2k.execute-api.us-east-2.amazonaws.com/staging/localizacao",
    NOTIFICACAO_PUSH:
      "https://kf5f186275.execute-api.us-east-2.amazonaws.com/staging/notificacao-push",
    DEVICE_TOKEN:
      "https://g0dq4vbe4e.execute-api.us-east-2.amazonaws.com/staging/device-token",
    PLACAS:
      "https://b2cea4n9dj.execute-api.us-east-2.amazonaws.com/staging/placas",
    PLUGUE:
      "https://b1nx1iqtza.execute-api.us-east-2.amazonaws.com/staging/plugue/por-imei",
    SMS: "https://vtb3pl4cu5.execute-api.us-east-2.amazonaws.com/staging/sms",
    STATUS_FOTOS:
      "https://2za1ew1b9l.execute-api.us-east-2.amazonaws.com/staging/status-fotos",
    USUARIO:
      "https://q6w53bb5ij.execute-api.us-east-2.amazonaws.com/staging/usuario",
    VIAGENS:
      "https://bqcnq1xz0b.execute-api.us-east-2.amazonaws.com/staging/viagens",
    CPF_CNPJ:
      "https://xvz58gaqw5.execute-api.us-east-2.amazonaws.com/staging/cpf-cnpj",
    TELEFONIA:
      "https://ttx5d204a1.execute-api.us-east-2.amazonaws.com/staging/telefonia",
    FURTO_ROUBO:
      "https://8g6njjqphi.execute-api.us-east-2.amazonaws.com/staging/furto-roubo",
    SAP: "https://sapiis.loovi.com.br:20000/Api/Loovi",
    MAGIC:
      "https://magictestes.loovi.com.br/Magicxpi4.13/MgWebRequester.dll?appname=IFSLOOVI&prgname=HTTP&arguments=-AHTTP_XPI%23",
    EMAIL:
      "https://ngsjtcjxhg.execute-api.us-east-2.amazonaws.com/staging/email",
    SFTOKEN:
      "https://loovi-salesforce.sevn.technology/salesforce/get-token-test",
    POST_CALL:
      "https://loovi-salesforce.sevn.technology/salesforce/post-call-test",
    WEBTOLEAD:
      "https://loovi-salesforce.sevn.technology/salesforce/submit-lead-test",
    WEBTOCASE:
      "https://loovi-salesforce.sevn.technology/salesforce/submit-case-test",
    URLPROXY: "https://6syrq1gkul.execute-api.us-east-2.amazonaws.com/staging/proxy",
    SAPFATURA: 'https://sapiis.loovi.com.br:50000/fatura/api/v1',
  },
  development: {
    ALERTA_MOVIMENTO:
      "https://48iq4loe51.execute-api.us-west-2.amazonaws.com/desenvolvimento/alerta-movimento",
    AUTENTICACAO:
      "https://0c752s006h.execute-api.us-west-2.amazonaws.com/desenvolvimento/autenticacao",
    COMANDOS:
      "https://4c7nr2hiii.execute-api.us-west-2.amazonaws.com/desenvolvimento/comandos",
    CONTRATOS:
      "https://0gyaxq46x0.execute-api.us-west-2.amazonaws.com/desenvolvimento/contratos",
    CORREIOS:
      "https://8j40xbb5i2.execute-api.us-west-2.amazonaws.com/desenvolvimento/correios",
    DADOS_CLIENTE:
      "https://a0at8wtejc.execute-api.us-west-2.amazonaws.com/desenvolvimento/dados-cliente",
    EVENTOS:
      "https://ahdmskkp01.execute-api.us-west-2.amazonaws.com/desenvolvimento/eventos",
    FOTOS:
      "https://88tm6skitk.execute-api.us-west-2.amazonaws.com/desenvolvimento/fotos",
    LOCALIZACAO:
      "https://b9zxjyyck9.execute-api.us-west-2.amazonaws.com/desenvolvimento/localizacao",
    NOTIFICACAO_PUSH:
      "https://1xdnocu684.execute-api.us-west-2.amazonaws.com/desenvolvimento/notificacao-push",
    DEVICE_TOKEN:
      "https://0uf7837qj0.execute-api.us-west-2.amazonaws.com/desenvolvimento/device-token",
    PLACAS:
      "https://08mbwrggad.execute-api.us-west-2.amazonaws.com/desenvolvimento/placas",
    PLUGUE:
      "https://94c6h6n4w0.execute-api.us-west-2.amazonaws.com/desenvolvimento/plugue",
    SMS: "https://3dfac0k5z7.execute-api.us-west-2.amazonaws.com/desenvolvimento/sms",
    STATUS_FOTOS:
      "https://g21hgn3io0.execute-api.us-west-2.amazonaws.com/desenvolvimento/status-fotos",
    USUARIO:
      "https://7ci5jepdyc.execute-api.us-west-2.amazonaws.com/desenvolvimento/usuario",
    VIAGENS:
      "https://dpbsin76d7.execute-api.us-west-2.amazonaws.com/desenvolvimento/viagens",
    CPF_CNPJ:
      "https://5yohmafj44.execute-api.us-west-2.amazonaws.com/desenvolvimento/cpf-cnpj",
    TELEFONIA:
      "https://78nfu6qub9.execute-api.us-west-2.amazonaws.com/desenvolvimento/telefonia",
    FURTO_ROUBO:
      "https://3i3ivbbnx0.execute-api.us-west-2.amazonaws.com/desenvolvimento/furto-roubo",
    SAP: "https://sapiis.loovi.com.br:10000/Api/Loovi",
    MAGIC:
      "https://magicdev.loovi.com.br/Magicxpi4.13/MgWebRequester.dll?appname=IFSLOOVI&prgname=HTTP&arguments=-AHTTP_XPI%23",
    EMAIL:
      "https://dvwafe96ra.execute-api.us-west-2.amazonaws.com/desenvolvimento/email",
    SFTOKEN: "https://loovi-salesforce.sevn.technology/salesforce/get-token",
    POST_CALL: "https://loovi-salesforce.sevn.technology/salesforce/post-call",
    WEBTOLEAD:
      "https://loovi-salesforce.sevn.technology/salesforce/submit-lead-test",
    WEBTOCASE:
      "https://loovi-salesforce.sevn.technology/salesforce/submit-case-test",
    URLPROXY:
      "https://6syrq1gkul.execute-api.us-east-2.amazonaws.com/staging/proxy",
    SAPFATURA: ': https://sapiis.loovi.com.br:50000/fatura/api/v1',
  },
};

export const URLS = URLS_LIST[ENVIRONMENT];

const API_KEY_LIST = {
  staging: "6aY0lmR6Xn0WpCsEQN7G5cVB6zCvE6s5MGRYgGEe",
  development: "VmVnbVhX3J57odqT25wws3tMcxWIMMXZ6yIj5AyS",
  production: "PV2nNyJFLX3l1QpqpURNeaWB4NW6CsEc4fhZ3PIY",
};

const API_BANCO_LIST = {
  staging: "CW_LOOVI_TST_OFICIAL",
  development: "CW_LOOVI_DEV",
  production: "CW_LOOVI_PRD_OFICIAL",
};

const USER_SAP_LIST = {
  staging: "SevenApp:Loovi@SevenApp1",
  development: "SevenApp:Loovi@DevSevenApp",
  production: "SevenApp:Loovi@SevenApp",
};

export const API_BANCO = API_BANCO_LIST[ENVIRONMENT];

export const USER_SAP = USER_SAP_LIST[ENVIRONMENT];

export const API_KEY = API_KEY_LIST[ENVIRONMENT];

export const REQUEST_MAX_TIME = 90000;

export const api_auth = ky.create({
  timeout: REQUEST_MAX_TIME,
  hooks: {
    beforeRequest: [
      async (request) => {
        if (isLogged()) {
          request.headers.set("id-token", authHandler.getToken());
          return request.headers.set("x-api-key", API_KEY);
        } else {
          await updateTokens();
          request.headers.set("id-token", authHandler.getToken());
          return request.headers.set("x-api-key", API_KEY_LIST[ENVIRONMENT]);
        }
      },
    ],
  },
});

export const api_keyed = ky.create({
  timeout: REQUEST_MAX_TIME,
  hooks: {
    beforeRequest: [
      (request) => request.headers.set("x-api-key", API_KEY_LIST[ENVIRONMENT]),
    ],
  },
});

export const api = ky.create({
  timeout: REQUEST_MAX_TIME,
});