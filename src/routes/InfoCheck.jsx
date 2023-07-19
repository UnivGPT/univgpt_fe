const InfoCheck = () => {
	return (
	<div className="w-100% h-100% py-20 mx-10">
	   <div className="border-box border-white bg-white rounded-3xl px-20 py-10 m-12">
		  <div className="flex flex-col items-center">
			 <h3 className="font-semibold text-5xl text-black ">비밀번호 확인</h3>
			 <br></br>
			 <br></br>
			 <div className="items-center">
			 <h1 className="font-semibold text-ll text-gray-700">
			회원정보를 안전하게 보호하기 위해
			 <br></br>
			 비밀번호를 한 번 더 입력해 주세요!
			 <br></br>
			 <br></br>
			 </h1>
			 <form className="form-b">
			 {/*<label htmlFor="password" className="label font-bold text-xl text-black">
				비밀번호
			 </label> */}
			 <input required type="password" id="password" className="input-b"/>
			 <br></br>
			 <div className="flex flex-col items-center w=1/2">
			   <button type="submit" className="items-center button mt-7">
				 회원정보 수정
			   </button>
			 </div>
			 </form>
			 </div>
		  </div>
	   </div>
	</div>
	);
 };
 
 export default InfoCheck;