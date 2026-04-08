export default function Login() {
  return (
    <div style={{ padding: "40px", maxWidth: "400px", margin: "50px auto" }}>
      <h1>Login</h1>
      <form>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Email:</label>
          <input 
            type="email" 
            placeholder="seu@email.com" 
            style={{ 
              width: "100%", 
              padding: "10px", 
              border: "1px solid #ccc", 
              borderRadius: "5px",
              boxSizing: "border-box"
            }} 
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Senha:</label>
          <input 
            type="password" 
            placeholder="Sua senha" 
            style={{ 
              width: "100%", 
              padding: "10px", 
              border: "1px solid #ccc", 
              borderRadius: "5px",
              boxSizing: "border-box"
            }} 
          />
        </div>
        <button 
          type="submit" 
          style={{ 
            width: "100%", 
            padding: "10px", 
            background: "#007bff", 
            color: "white", 
            border: "none", 
            borderRadius: "5px", 
            cursor: "pointer", 
            fontSize: "16px"
          }}
        >
          Entrar
        </button>
      </form>
      <p style={{ marginTop: "20px", textAlign: "center" }}>
        <a href="/" style={{ color: "#007bff", textDecoration: "none" }}>Voltar</a>
      </p>
    </div>
  );
}
