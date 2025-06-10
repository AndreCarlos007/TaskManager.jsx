'use client';

const LogoutButton = ({ children }) => {
  const handleLogout = async () => {
    try {
      // Chama a API para deletar o cookie
      const response = await fetch('/api/auth/logout', {
        method: 'POST'
      });

      if (response.ok) {
        // Recarrega a página completamente após logout
        window.location.reload();
      } else {
        console.error('Falha no logout');
      }
    } catch (error) {
      console.error('Erro durante logout:', error);
    }
  };

  return (
    <div className="flex justify-center items-center">
    <button onClick={handleLogout} className="cursor-pointer bg-[#171717] p-1 text-[#6e6e6e] font-medium hover:text-white hover:bg-[#121212] rounded-[6px] transition-all duration-300 border border-[#212121]">
      {children || <div className="flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5M4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4z"/></svg>
        <span>Logout</span>
      </div> }
    </button>
    </div>
  );
};

export default LogoutButton;