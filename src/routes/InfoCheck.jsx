const InfoCheck = () => {
	return (
		<div className="w-3/5 h-1/2 border-box border-white bg-white text-black relative">
		<div className="flex flex-col items-center w-100%">
			<h3 className="font-semibold text-5xl">비밀번호 확인</h3>
			<br></br>
			회원정보를 안전하게 보호하기 위해
			<br></br>
			비밀번호를 한 번 더 확인해주세요
			<br></br>
			<form className="form-b">
       
        <label htmlFor="password" className="label font-bold text-l">
          비밀번호
        </label>
        <input required type="password" id="password" className="input-b"/>
        </form>
		</div>
		</div>
	);
};

export default InfoCheck;