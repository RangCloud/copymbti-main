import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import mbtiImg from './freeImg/mbti.png';
import resultImg from './freeImg/ghost-8250317_1280.png';

function App() {

  const setVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }
  
  useEffect(()=>{

    document.title = "MBTI Test";

    setVh();

    function onResize(){
      setVh()
    }

    window.addEventListener('resize', onResize)

  },[])

  const [userName, setUserName] = useState("");

  const saveName = async () => {
    if(!userName.trim()) {
      return;
    }
    try {
      await axios.post('', {name : userName})
    } catch (error) {
      
    }
  };

  const [page, setPage] = useState(0);

  const [loading, setLoading] = useState(false);

  const qList = [
          {q : ['1. 오랜만에 친구와 만나 놀던 도중, \n친구의 친구가 같이 놀아도 된다고 물어본다면..?'],
            a : [{ type : 'E', text : '당연히 가능! 오늘부터 친구다'},
                  { type : 'I', text : '어어..?(싫은데..)'}]},
          {q : ['2. 다음 중 더 공감되는 말은?'],
            a : [{ type : 'E', text : '주말이니까 밖에 나가볼까??'},
                  { type : 'I', text : '주말이니까 집에서 푹 쉬자!'}]},
          {q : ['3. 다가오는 생일에 파티를 하려는데.. 초대할 수 있는 친구는?'],
            a : [{ type : 'E', text : '어느 정도 친한 친구도 초대 가능'},
                  { type : 'I', text : '찐친 몇 명만 초대가능'}]},
          {q : ['4. 내가 강아지로 변하면 어떻게 할 것 같아??'],
            a : [{ type : 'S', text : '그럴 수가 있나?'},
                  { type : 'N', text : '다시 돌아올 수 있는거야? 근데 귀엽겠당!'}]},
          {q : ['5. 샤워하면서 무슨 생각해?'],
            a : [{ type : 'S', text : '아무 생각 안하는데?'},
                  { type : 'N', text : '오늘 뭐하지? 뭐 먹지? 어제 뭐 실수한거 없나?'}]},
          {q : ['6. 갑자기 좀비가 나타나면?'],
            a : [{ type : 'S', text : '좀비는 없어.'},
                  { type : 'N', text : '일단 생필품 먼저사고 집에 있는 가구로 무기만들거야'}]},
          {q : ['7. 친구한테 교통사고났다고 전화가 왔다. 당신의 대답은?'],
            a : [{ type : 'T', text : '보험 불렀어?'},
                  { type : 'F', text : '다친 곳 없어? 괜찮아??'}]},
          {q : ['8. 나 너랑 별로 안맞는 것 같아..'],
            a : [{ type : 'T', text : '왜? (이유 궁금)'},
                  { type : 'F', text : '!!! (마상...)'}]},
          {q : ['9. 나 배탈 난 것 같아'],
            a : [{ type : 'T', text : '뭐 먹었는데?'},
                  { type : 'F', text : '약 먹었어?? 얼른 병원 가자!'}]},
          {q : ['10. 심심한데 뭐하냐 나와~'],
            a : [{ type : 'P', text : 'ㅇㅋ 나감'},
                  { type : 'J', text : '응?? 갑자기?? 흠,,,'}]},
          {q : ['11. 오늘 뭐 먹을까?'],
            a : [{ type : 'P', text : '몰라 맛있어보이는 곳 가자'},
                  { type : 'J', text : '계획이 다 있지! 맛집리스트 뽑았다'}]},
          {q : ['12. 여행 갈 때 당신은??'],
            a : [{ type : 'P', text : '대략적으로 코스만 짬 그것도 안지킴'},
                  { type : 'J', text : '시간단위 분단위별로 계획 다 짬'}]},
  ]

  const [mbtiList, setMbtiList] = useState([
    {name:'E', count: 0},{name:'I', count: 0},{name:'S', count: 0},{name:'N', count: 0},
    {name:'T', count: 0},{name:'F', count: 0},{name:'P', count: 0},{name:'J', count: 0}
  ])

  const handleOnChange = (type, idx) => {
    let mL = [...mbtiList];
    for(let i = 0; i < mL.length; i++){
      if(mL[i].name === type){
        mL[i].count = mL[i].count + 1
      }
    }

    setMbtiList(mL);
    setPage(page + 1);

    if (page === qList.length) {
      setLoading(true);
      setTimeout(() => {
        setMbti();
        setLoading(false);
      }, 3000);
    }
  }

  const [mbtiContents, setMbtiContents] = useState(
    {mbti:'', content:[], description:''}
  );

  function setMbti(){
    let ls = mbtiList;
    let mbtiCodeList = [
      {mbti:'ESTP', content:['1','1','1'], result: '사업가', description:'위험을 기꺼이 감수하는 성격으로, \n영리하고 에너지 넘치며 \n관찰력이 뛰어난 사업가입니다.'},
      {mbti:'ESTJ', content:['1','1','1'], result: '경영자', description:'사물과 사람을 관리하는데 \n뛰어난 능력을 지닌 경영자입니다.'},
      {mbti:'ESFP', content:['1','1','1'], result: '연예인', description:'즉흥적이고 넘치는 에너지와 열정으로 \n주변 사람을 즐겁게 하는 연예인입니다.'},
      {mbti:'ESFJ', content:['1','1','1'], result: '집정관', description:'배려심이 넘치고 항상 다른 사람을 도울 준비가 \n되어 있는 성격으로, 인기가 많고 \n사교성 높은 마당발입니다.'},
      {mbti:'ENTP', content:['1','1','1'], result: '변론가', description:'지적 도전을 즐기는 영리하고 \n호기심이 많은 사색가입니다.'},
      {mbti:'ENTJ', content:['1','1','1'], result: '통솔자', description:'항상 문제 해결 방법을 찾아내는 성격으로, \n대담하고 상상력이 풍부하며 의지가 강력한 지도자입니다.'},
      {mbti:'ENFP', content:['1','1','1'], result: '활동가', description:'열정적이고 창의적인 성격으로, \n긍정적으로 삶을 바라보는 사교적이면서도 \n자유로운 영혼입니다.'},
      {mbti:'ENFJ', content:['1','1','1'], result: '선도자', description:'청중을 사로잡고 의욕을 불어넣는 \n카리스마 넘치는 지도자입니다.'},
      {mbti:'ISTP', content:['1','1','1'], result: '장인', description:'대담하면서도 현실적인 성격으로, \n모든 종류의 도구를 자유자재로 다루는 장인입니다.'},
      {mbti:'ISTJ', content:['1','1','1'], result: '현실주의자', description:'사실을 중시하는 \n믿음직한 현실주의자입니다.'},
      {mbti:'ISFP', content:['1','1','1'], result: '모험가', description:'항상 새로운 경험을 추구하는 \n유연하고 매력 넘치는 예술가입니다.'},
      {mbti:'ISFJ', content:['1','1','1'], result: '수호자', description:'주변 사람을 보호할 준비가 되어 있는 \n헌신적이고 따뜻한 수호자입니다.'},
      {mbti:'INTP', content:['1','1','1'], result: '논리술사', description:'지식을 끝없이 갈망하는 \n혁신적인 발명가입니다.'},
      {mbti:'INTJ', content:['1','1','1'], result: '전략가', description:'모든 일에 대해 계획을 세우며 \n상상력이 풍부한 전략가입니다.'},
      {mbti:'INFP', content:['1','1','1'], result: '중재자', description:'항상 선을 행할 준비가 되어 있는 \n부드럽고 친절한 이타주의자입니다.'},
      {mbti:'INFJ', content:['1','1','1'], result: '옹호자', description:'차분하고 신비한 분위기를 풍기는 성격으로, \n다른 사람에게 의욕을 불어넣는 이상주의자입니다.'},
    ]

    let IorE = 
      ls.find(function(data){return data.name === 'I'}).count >
      ls.find(function(data){return data.name === 'E'}).count ? 'I' : 'E'
    let SorN = 
      ls.find(function(data){return data.name === 'S'}).count >
      ls.find(function(data){return data.name === 'N'}).count ? 'S' : 'N'
    let ForT = 
      ls.find(function(data){return data.name === 'F'}).count >
      ls.find(function(data){return data.name === 'T'}).count ? 'F' : 'T'
    let PorJ = 
      ls.find(function(data){return data.name === 'P'}).count >
      ls.find(function(data){return data.name === 'J'}).count ? 'P' : 'J'

    let mbti = IorE + SorN + ForT + PorJ;

    let matchingMbti = mbtiCodeList.find((val) => val.mbti === mbti);
  
    setMbtiContents(matchingMbti || { mbti: '', content: [] });
  }

  useEffect(() => {
    if (page === qList.length) {
      setMbti();
    }
  }, [mbtiContents, page]);

  return (
    <div className="mbtiLayout">
      {page === 0 ? 
        <div className='startLayout'>
          <div className='startLogo'>
            <img src={mbtiImg}/>
          </div>
          <button onClick={()=>setPage(1)} className='startBtn'>Start!</button>
        </div>
      : page <= qList.length?
      <div className='questionLayout'>
        <div className='mbtiTitle'>
          <div>MBTI 테스트</div>
          <div>{`${page} / ${qList.length}`}</div>
        </div>
          {qList.map((val, idx) => 
            <div className='questionList' style={{display:page === idx + 1 ? 'flex' : 'none'}} key={idx}>
              <div className='questionItemLayout'>
              {val.q.map((qval, qidx) => (
                <div key={qidx}>
                  {qval.split('\n').map((line, lineIndex) => (
                <div key={lineIndex}>{line}</div>
                ))}
              </div>
              ))}
              </div>
              <div className='answerItemLayout'>
              {val.a.map((aval, aidx)=>
                  <div key={aidx} className='answerBox' onClick={ () => handleOnChange(aval.type)}>
                    <div>{aval.text}</div>
                  </div>
                )}
              </div>
            </div>
          )}
      </div>
      :
      <div className='questionLayout'>
        <div className='mbtiTitle'>
          <div>MBTI 테스트</div>
        </div>
            <div className='questionList' style={{display:'flex'}}>
              <div className="questionItemLayout">
                {loading ? (
                  <div className="loadingScreen">
                    <img className="loadingImg" src={resultImg}/>
                    <p>잠시만 기다려주세요!</p>
                  </div>
                ) : (
                  <div className="resultBox">
                    <div>당신의 MBTI는 {mbtiContents.mbti || "결과없음"}</div>
                    <p>{mbtiContents.mbti || "결과없음"}는 {mbtiContents.result}입니다!</p>
                    <div className='introBox'>
                    {mbtiContents.description.split('\n').map((item, index) => (
                      <div key={index}>{item}</div>
                    ))}
                    </div>
                    <div className='reStart' onClick={() => window.location.reload()}>다시하러하기</div>
                  </div>
                )}
              </div>
            </div>
      </div>
      }
    </div>
  );
}

export default App;
