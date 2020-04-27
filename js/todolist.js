$(function(){
	//1.按下回车键 把完整数据 存储到本地存储里面 回车键是13
	//存储的数据格式 var todolist = [{title : "xxx", done : false}]
	load();//保证一打开页面就进来

	$("#title").on("keydown", function(event){
		if(event.keyCode === 13){
			if($(this).val() === ""){
				alert("请输入您要的操作!");
			}else{
				//先读取本地存储原来的数据
				var local = getData();
				//把local数组进行更新数据 把最新的数据追加给local数组
				local.push({title : $(this).val(), done : false});//push 追加在数组最后面
				//把这个数组local 存储给本地存储
				saveData(local);
				//2.toDoList 本地存储数据渲染加载到页面
				load();
				$(this).val("");
			}
		}
	});

	//3.删除操作
	$("ol,ul").on("click","a",function(){
		//先获取本地存储
		var data = getData();
		//修改数据 获取要删除的数据的索引号
		var index = $(this).attr("id");
		data.splice(index, 1); //splice 表示从第index删起，删除1个
		//保存到本地存储
		saveData(data);
		//重新渲染页面
		load();
	})

	//4.toDoList 正在进行和已完成选项操作
	$("ol, ul").on("click","input", function(){
		//先获取本地存储
		var data = getData();
		//修改数据
		var index = $(this).siblings("a").attr("id");
		data[index].done = $(this).prop("checked");
		//保存到本地存储
		saveData(data);
		//重新渲染页面
		load();
	})

	//读取本地存储的数据
	function getData (){
		var data = localStorage.getItem("todolist");
		if (data !== null){
			//本地存储里面的数据是字符串格式的 但是我们需要的是对象格式的
			//JSON.parse() 将字符串格式转换为对象格式
			return JSON.parse(data);
		}else{
			return [];
		}
	}

	//保存本地存储数据
	function saveData(data){
		//JSON.stringify() 把对象格式转换为字符串格式
		localStorage.setItem("todolist",JSON.stringify(data));
	}

	//渲染加载数据
	function load(){
		//读取本地存储的数据
		var data = getData();
		//遍历之前先要清空ol,ul标签里面的元素内容
		$("ol,ul").empty();
		var todoCount = 0;//正在进行的个数 
		var doneCount = 0;//已经完成的个数
		//遍历这个数据
		$.each(data, function(i,n){
			if(n.done){
				$("ul").prepend("<li> <input type='checkbox' checked='checked'> <p>"+n.title+"</p> <a href='javascript:;' id="+i+"></a> </li>");
				doneCount++;
			}else{
				$("ol").prepend("<li> <input type='checkbox'> <p>"+n.title+"</p> <a href='javascript:;' id="+i+"></a> </li>");
				todoCount++;
			}
		});

		$("#todocount").text(todoCount);
		$("#donecount").text(doneCount);
	}
})