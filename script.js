var ansList=[], d;

function UITest1() {
	$.ajax({
        type: "GET" ,
        url: "data.xml" ,
        dataType: "xml" ,
        success: function(xml) {
			loadXMLData(xml);
		}
    }).done(function() {
		$("#wrapper").on('click','.questions:visible:last input[type="radio"]',function () {
			//alert(1);
			var vislen = $(".questions:visible").length,
			quelen = $(".questions").length;
			$("#nextButton").removeAttr("disabled");
			if(vislen == quelen) {
				$("#nextButton").text("Show Answer");
			}
		});
	});
}

function loadXMLData(data) {
	console.log(data);
	d = data;
	$("#wrapper").html("");
	$(data).find('question').each(function(e) {
		var THIS = $(this);
		var qval = THIS.find("question_text").text(),
			ansr = THIS.find("question_text").attr("answer");
		
		var setVar = "<div id='"+qval.replace(/ /gi,'')+"' class='questions'><p><strong>"+qval+"</strong></p><ul class='options'>";
		THIS.find("options option").each(function() {
			var optionvar = "<li><input type='radio' value='"+$(this).html()+"' name='"+qval.replace(/ /gi,'')+"'>"+$(this).html()+"</li>";
			setVar+=optionvar;
		});
		setVar+="</ul><p class='answer'></p></div>";
		$("#wrapper").append(setVar);
		ansList.push(ansr);
	});
	$("#wrapper").append('<button id="nextButton" onclick="FunNextNode()" disabled>Next</button>');
	console.log(ansList);
}

function FunNextNode() {
	//console.log();
	txtval = $("#nextButton").text();
	var vislen = $(".questions:visible").length,
		quelen = $(".questions").length;
	if(vislen!=quelen && txtval!="Show Answer") {
		$(".questions:visible").next().show(500);
		$("#nextButton").attr("disabled","true");
	} else {
		checkAns();
	}
}

function checkAns() {
	$(".questions:visible").each(function(index) {
		var chekedval = $(this).find("input:checked").val();
		//chekedvalnum = ;
		var ht = $(".questions")[index];
		var htmlstr = "The Answer is <strong>Option "+ansList[index]+"</strong>";
		$(ht).find('.answer').html(htmlstr);
		
		if(ansList[index] == chekedval.replace(/Option /gi,"")) {
			$(this).find("input:checked").parent("li").addClass("right");
		} else {
			$(this).find("input:checked").parent("li").addClass("wrong");
		}
	});
	
}