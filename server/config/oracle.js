import oracledb from "oracledb";
import "dotenv/config";

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

export async function initOracle() {
  try {
    await oracledb.createPool({
      user: process.env.ORACLE_USERNAME,
      password: process.env.ORACLE_PASSWORD,
      connectString: process.env.ORACLE_CONNECTION,
      poolAlias: "default",
      poolMin: 2,
      poolMax: 10,
      poolIncrement: 1,
    });
    console.log("✅ OracleDB pool iniciado");
  } catch (err) {
    console.error("Erro ao conectar ao OracleDB:", err);
    process.exit(1);
  }
}

export async function closeOracle() {
  try {
    await oracledb.getPool().close(10);
    console.log("✅ OracleDB pool fechado");
  } catch (err) {
    console.error("Erro ao fechar OracleDB pool:", err);
  }
}

export async function getConnection() {
  return await oracledb.getConnection("default");
}
