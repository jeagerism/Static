'use client'
import React, { useState } from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

function page() {
  const mathJaxConfig = {
    displayAlign: "left", // Set display alignment to left
    extensions: ["TeX/color.js"],
    'fast-preview': { disabled: false },
    inline: false
  };

  const [l_CB, setl_CB] = useState(0.5);
  const [l_B, setl_B] = useState(0.2);
  const [l_D, setl_D] = useState(0.2);
  const [l_A, setl_A] = useState(0.1);
  const [F, setF] = useState(400);

  const [ang_a, setang_a] = useState(0);
  const [ang_b, setang_b] = useState(0)
  const [len_w, setlen_w] = useState(0);
  const [aForce, setaForce] = useState(0);
  const [bForce, setbForce] = useState(0);
  const [l_CB2P, setl_CB2P] = useState(0);
  const [l_CA, setl_CA] = useState(0);

  function handleSubmit() {

    const ang_b = Math.atan(l_D / l_B) * (180 / Math.PI) //หามุมที่จุด B กระทำต่อแนวระนาบ
    const ang_bFloat = parseFloat(ang_b.toFixed(2));
    setang_b(ang_bFloat)

    const angle_bRad = ang_b * Math.PI / 180; //เปลี่ยนจาก Degree เป็น radian

    const l_horizon = l_CB / Math.tan(angle_bRad) //หาความยาวของเส้นที่ลากจาก CB ไปยังเส้นขนานที่ ลากจากมุม B มาตัด
    const l_horizon1decimal = parseFloat(l_horizon.toFixed(1))
    setl_CB2P(l_horizon1decimal)

    const l_CA = l_CB + l_D
    setl_CA(l_CA)


    const len_plus = l_horizon - l_A;
    const updatedLenW = parseFloat(len_plus.toFixed(2));
    setlen_w(updatedLenW);

    const ang_tan = Math.atan((l_D + l_CB) / updatedLenW) * (180 / Math.PI); //หามุมที่จุด A กระทำต่อแนวระนาบ
    const ang_aFloat = parseFloat(ang_tan.toFixed(2));
    setang_a(ang_aFloat);

    const angle_aRad = ang_aFloat * Math.PI / 180; //เปลี่ยนจาก Degree เป็น radian

    const bForce_cal = -1 * F / (((Math.sin(angle_bRad) * Math.cos(angle_aRad)) / Math.sin(angle_aRad)) - Math.cos(angle_bRad)); //หาแรงปฏิกิริยาที่จุด A
    const bForce_calFloat = parseFloat(bForce_cal.toFixed(2));
    setbForce(bForce_calFloat);

    const aForce_cal = (bForce_cal * Math.sin(angle_bRad)) / Math.sin(angle_aRad)
    const aForce_calFloat = parseFloat(aForce_cal.toFixed(2));
    setaForce(aForce_calFloat);

  }
  return (
    <div className="w-full h-full">
      <MathJaxContext config={mathJaxConfig}>
        <div className="flex-col w-[1280px] h-auto">
          <div className="flex w-full h-[500px]">
            <div className="relative h-[450px] w-[500px]">
              <img src="/ex3.jpg" alt="" className="w-full h-full object-contain" />
              <input
                type="number"
                className="absolute top-[30%] left-[55%] h-10 w-16 border border-gray-400 px-2"
                name='l_CB'
                value={l_CB}
                onChange={(e) => setl_CB(parseFloat(e.target.value))}
              />
              <input
                type="number"
                className="absolute top-[39%] left-[29%] h-10 w-16 border border-gray-400 px-2"
                name='l_B'
                value={l_B}
                onChange={(e) => setl_B(parseFloat(e.target.value))}
              />
              <input
              // type="number"
              // className="absolute top-[59%] left-[8%] h-10 w-16 border border-gray-400 px-2"
              // name='l_D'
              // value={l_D}
              // onChange={(e) => setl_D(parseFloat(e.target.value))}
              />
              <input
                type="number"
                className="absolute top-[87%] left-[42%] h-10 w-16 border border-gray-400 px-2"
                name='l_A'
                value={l_A}
                onChange={(e) => setl_A(parseFloat(e.target.value))}
              />
              <input
                type="number"
                className="absolute top-[3%] left-[59%] h-10 w-16 border border-gray-400 px-2"
                name='F'
                value={F}
                onChange={(e) => setF(parseFloat(e.target.value))}
              />
            </div>

            <div className="flex relative h-[400px] w-[400px] mt-[50px]">
              <img src="/FBD1_ex3.jpg" alt="" className=" object-contain" />

              <h1 className="bg-white absolute top-[45%] left-[15%] h-5 w-10 border border-red-600 text-clip overflow-hidden">{l_D + "m"}</h1>
              <h1 className="bg-white absolute top-[30%] left-[45%] h-5 w-10 border border-red-600 text-clip overflow-hidden">{l_B + "m"}</h1>
            </div>

            <div className="flex relative h-[500px] w-[500px]">
              <img src="/FBD2_ex3.jpg" alt="" className="w-full h-full object-contain" />

              <h1 className="bg-white absolute top-[17%] left-[40%] h-5 w-20 border border-red-600 text-clip overflow-hidden">{F}</h1>
              <h1 className="bg-white absolute top-[33%] left-[9%] h-5 w-7 border border-red-600 text-clip overflow-hidden">{l_CB}</h1>
              <h1 className="bg-white absolute top-[28%] left-[41%] h-5 w-10 border border-red-600 text-clip overflow-hidden">{l_CB2P}</h1>
              <h1 className="bg-white absolute top-[39%] left-[85%] h-5 w-7 border border-red-600 text-clip overflow-hidden">{l_CA}</h1>
              <h1 className="bg-white absolute top-[62%] left-[52%] h-5 w-7 border border-red-600 text-clip overflow-hidden">{len_w}</h1>
              <h1 className="bg-white absolute top-[77%] left-[50%] h-5 w-7 border border-red-600 text-clip overflow-hidden">{l_A}</h1>

              <h1 className="bg-white absolute top-[56%] left-[51%] h-5 w-7 border border-red-600 text-clip overflow-hidden">{ang_a}</h1>
              <h1 className="bg-white absolute top-[51%] left-[20%] h-5 w-7 border border-red-600 text-clip overflow-hidden">{ang_b}</h1>
            </div>

            <div className="flex w-[100px] items-end">
              <button className='mr-[50px] ml-auto p-3 bg-blue-500 mt-3 rounded-md text-gray-50 hover:bg-blue-600' onClick={handleSubmit}>Calculate</button>
            </div>
            
          </div>

          <div className="flex flex-col border p-3 h-auto w-[700px]">
            <div className="flex w-full h-1/2 mb-[5px]">
              <div className="flex-col w-1/2 h-full mt-[5px] mr-[5px] border">
                <p className="mb-[10px] ml-[5px] mt-[5px]">หามุมของแรงปฏิกิริยา A กระทำกับแนวระนาบ</p>
                <div className="mb-[10px] ml-[10px]">
                  <MathJax inline>{`\\( \\theta = \\tan^{-1}\\left(\\frac{${l_D} + ${l_CB}}{${len_w}}\\right) \\)`}</MathJax>
                </div>
                <div className="ml-[10px]">
                  <MathJax className="mb-[10px]">{`\\( \\theta = ${ang_a}^o \\)`}</MathJax>
                </div>
              </div>
              <div className="flex-col w-1/2 h-full mt-[5px] border">
                <p className="mb-[10px] ml-[5px] mt-[5px]">หามุมของแรงปฏิกิริยา B กระทำกับแนวระนาบ</p>
                <div className="mb-[10px] ml-[10px]">
                  <MathJax inline>{`\\( \\tan \\theta = \\frac{${l_D}}{${l_B}} \\)`}</MathJax>
                </div>
                <div className="ml-[10px]">
                  <MathJax>{`\\( \\theta = ${ang_b}^o \\)`}</MathJax>
                </div>
              </div>
            </div>
            <div className="flex-col w-full h-1/2 border p-1 mt-[5px]">
              <p className="mb-[5px] mt-[5px] ml-[5px]">พิจารณาหาแรงปฏิกิริยาที่จุด A และจุด B </p>
              <div className="mb-[10px] ml-[5px]">
                <MathJax inline>{`\\( \\sum F_x = 0 ; F_A \\cos( ${ang_a} ) - F_B \\cos( ${ang_b} ) + ${F} = 0 \\)`}</MathJax>
              </div>
              <div className="mb-[10px] ml-[5px]">
                <MathJax >{`\\( \\sum F_y = 0 ; F_A \\sin( ${ang_a} ) - F_B \\sin( ${ang_b} ) = 0 \\)`}</MathJax>
              </div>
              <div className="mb-[10px] ml-[5px]">
                <MathJax >{`\\( \\ F_A = ${aForce} N \\)`}</MathJax>
              </div>
              <div className="mb-[10px] ml-[5px]">
                <MathJax >{`\\( \\ F_B = ${bForce} N \\)`}</MathJax>
              </div>
            </div>
          </div>
        </div>
      </MathJaxContext>
    </div>
  )
}

export default page
