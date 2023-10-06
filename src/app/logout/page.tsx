'use client';

export default function page() {
  const logout = () => {
    localStorage.clear();
    location.replace('/');
  };

  return <>{logout()}</>;
}
