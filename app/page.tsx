export default function Home() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Bem-vindo ao ScaleConnect</h1>
      <p style={{ fontSize: "18px", color: "#666" }}>Plataforma de Vendas</p>
      <a href="/login" style={{ 
        padding: "12px 30px", 
        background: "#007bff", 
        color: "white", 
        textDecoration: "none", 
        borderRadius: "5px",
        fontSize: "16px",
        display: "inline-block",
        marginTop: "20px"
      }}>
        Entrar
      </a>
    </div>
  );
}
