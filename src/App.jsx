import { useEffect, useMemo, useState } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";

const USERS_KEY="flowtask-users",SESSION_KEY="flowtask-session";
const readJSON=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}};

function AuthModal({mode,onClose,onLogin,onSignup,onSwitch}){
  const [name,setName]=useState(""),[email,setEmail]=useState(""),[password,setPassword]=useState(""),[error,setError]=useState("");
  const isSignup=mode==="signup";
  const submit=e=>{e.preventDefault();const result=isSignup?onSignup(name.trim(),email.trim(),password):onLogin(email.trim(),password);if(result)setError(result)};
  return <div className="modal-backdrop" onMouseDown={onClose}><section className="auth-modal" onMouseDown={e=>e.stopPropagation()} role="dialog" aria-modal="true">
    <button className="modal-close" onClick={onClose}>×</button><div className="auth-symbol">✦</div><span className="micro">FOCUS, YOUR WAY</span>
    <h2>{isSignup?"Begin your flow":"Welcome back"}</h2><p>{isSignup?"Create a private home for everything you want to accomplish.":"Your plans are waiting exactly where you left them."}</p>
    <form className="auth-form" onSubmit={submit}>{isSignup&&<label>Name<input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" required/></label>}<label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" required/></label><label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} minLength="6" placeholder="At least 6 characters" required/></label>{error&&<div className="form-error">{error}</div>}<button>Continue <span>↗</span></button></form>
    <div className="auth-switch">{isSignup?"Already have an account?":"Need an account?"}<button onClick={()=>onSwitch(isSignup?"login":"signup")}>{isSignup?"Login":"Sign up"}</button></div>
  </section></div>
}

function App(){
  const [session,setSession]=useState(()=>readJSON(SESSION_KEY,null));
  const [tasks,setTasks]=useState(()=>{const user=readJSON(SESSION_KEY,null);return user?readJSON(`flowtask-tasks-${user.email}`,[]):[]});
  const [authMode,setAuthMode]=useState(null),[filter,setFilter]=useState("all"),[query,setQuery]=useState("");
  const storageKey=session?`flowtask-tasks-${session.email}`:null;
  useEffect(()=>{if(storageKey)localStorage.setItem(storageKey,JSON.stringify(tasks))},[tasks,storageKey]);
  const startSession=user=>{const next={name:user.name,email:user.email};setTasks(readJSON(`flowtask-tasks-${user.email}`,[]));localStorage.setItem(SESSION_KEY,JSON.stringify(next));setSession(next);setAuthMode(null)};
  const signup=(name,email,password)=>{const clean=email.toLowerCase(),users=readJSON(USERS_KEY,[]);if(users.some(u=>u.email===clean))return"An account already exists for this email.";const user={name,email:clean,password};localStorage.setItem(USERS_KEY,JSON.stringify([...users,user]));startSession(user);return""};
  const login=(email,password)=>{const user=readJSON(USERS_KEY,[]).find(u=>u.email===email.toLowerCase()&&u.password===password);if(!user)return"Email or password is incorrect.";startSession(user);return""};
  const logout=()=>{localStorage.removeItem(SESSION_KEY);setSession(null);setTasks([]);setQuery("");setFilter("all")};
  const addTask=title=>setTasks(current=>[{id:Date.now(),title,completed:false,createdAt:new Date().toISOString()},...current]);
  const toggleTask=id=>setTasks(current=>current.map(task=>task.id===id?{...task,completed:!task.completed}:task));
  const deleteTask=id=>setTasks(current=>current.filter(task=>task.id!==id));
  const done=tasks.filter(t=>t.completed).length,open=tasks.length-done,progress=tasks.length?Math.round(done/tasks.length*100):0;
  const visible=useMemo(()=>tasks.filter(t=>(filter==="all"||(filter==="done")===t.completed)&&t.title.toLowerCase().includes(query.toLowerCase())),[tasks,filter,query]);
  const now=new Date(),date=new Intl.DateTimeFormat("en-US",{weekday:"long",month:"long",day:"numeric"}).format(now);
  const week=Array.from({length:5},(_,i)=>{const d=new Date();d.setDate(now.getDate()+i);return{day:d.toLocaleDateString("en-US",{weekday:"short"}).slice(0,2),number:d.getDate(),today:i===0}});

  return <main className="focus-shell"><div className="mesh mesh-one"/><div className="mesh mesh-two"/>
    <nav className="floating-nav"><div className="logo"><i>✦</i><span>Dayloom</span></div><div className="nav-pills"><button className="active">Today</button><button>Plan</button><button>Reflect</button></div><div className="nav-account">{!session?<><button className="link-button" onClick={()=>setAuthMode("login")}>Login</button><button className="dark-button" onClick={()=>setAuthMode("signup")}>Create account</button></>:<><div className="avatar">{session.name[0].toUpperCase()}</div><span>{session.name}</span><button className="logout" onClick={logout}>↗</button></>}</div></nav>
    <section className="canvas"><header className="canvas-head"><div><span className="date-pill">{date}</span><h1>{session?`Shape a good day, ${session.name.split(" ")[0]}.`:"Make space for what matters."}</h1><p>{session?"A quiet place to capture, choose, and complete your next meaningful step.":"A beautifully simple task space that belongs only to you."}</p></div><div className="head-stamp"><span>DAY</span><strong>{String(now.getDate()).padStart(2,"0")}</strong></div></header>
      {!session?<section className="guest-layout"><div className="guest-copy"><span className="micro">YOUR PRIVATE DAYBOOK</span><h2>Less clutter.<br/><em>More momentum.</em></h2><p>Dayloom turns your tasks into a calm visual rhythm. Every account receives its own private list, saved in the browser and ready when you return.</p><div><button className="start-button" onClick={()=>setAuthMode("signup")}>Start your day <span>→</span></button><button className="soft-button" onClick={()=>setAuthMode("login")}>Open my space</button></div></div><div className="guest-art"><div className="sun-card"><span>Today’s intention</span><strong>Move with purpose.</strong><i>✦</i></div><div className="floating-note note-a">01 <span>Choose</span></div><div className="floating-note note-b">02 <span>Focus</span></div><div className="floating-note note-c">03 <span>Finish</span></div><div className="orbit"/></div></section>:<section className="bento">
        <aside className="left-stack"><article className="capture-panel"><span className="micro">QUICK CAPTURE</span><h2>What needs your attention?</h2><p>Write it down before it disappears.</p><TaskForm onAddTask={addTask}/><div className="capture-deco">↘</div></article><article className="week-card"><div className="week-head"><div><span className="micro">THIS WEEK</span><strong>Keep the rhythm</strong></div><span>{done} wins</span></div><div className="week-strip">{week.map(d=><div className={d.today?"today":""} key={d.number}><span>{d.day}</span><strong>{d.number}</strong><i/></div>)}</div></article></aside>
        <section className="task-stage"><div className="stage-top"><div><span className="micro">TODAY’S FLOW</span><h2>Your next moves</h2></div><label className="task-search"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Find a task"/></label></div><div className="filter-chips">{[["all","Everything",tasks.length],["active","In motion",open],["done","Finished",done]].map(([id,label,count])=><button key={id} className={filter===id?"active":""} onClick={()=>setFilter(id)}>{label}<span>{count}</span></button>)}</div><TaskList tasks={visible} onToggleTask={toggleTask} onDeleteTask={deleteTask} emptyText={query?"Nothing matches that search.":filter==="all"?"Your canvas is clear. Add a task from Quick Capture.":`No ${filter} tasks here.`}/></section>
        <aside className="right-stack"><article className="momentum-card"><div className="ring" style={{"--progress":`${progress*3.6}deg`}}><div><strong>{progress}%</strong><span>complete</span></div></div><span className="micro">TODAY’S MOMENTUM</span><h3>{progress===100&&tasks.length?"Flow complete.":progress>50?"You’re in motion.":"Start with one step."}</h3><p>{done} finished · {open} still open</p></article><article className="quote-card"><span>“</span><p>Small steps make days that matter.</p><i>Dayloom note</i></article><article className="mini-stats"><div><span>OPEN</span><strong>{open}</strong></div><div><span>WINS</span><strong>{done}</strong></div></article></aside>
      </section>}
    </section>{authMode&&<AuthModal key={authMode} mode={authMode} onClose={()=>setAuthMode(null)} onLogin={login} onSignup={signup} onSwitch={setAuthMode}/>}
  </main>
}
export default App;
