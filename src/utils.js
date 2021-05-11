regex = /blocked by #(\d+)/i

const signature = "This comment was automatically written by the [Blocking Issues](https://github.com/Levi-Lesches/blocking-issues) bot, and this PR will be monitored for further progress.";

function getBlockingIssues(body) {
	issues = [];
	for (match of body.matchAll(regex)) {
		if (match [1] != undefined) {
			issues.push(parseInt(match [1]))
		}
	}
	return issues;
}

function getCommentText(blockingIssues, openIssues) {
	const isBlocked = openIssues.length > 0
	var result = "";
	result += `# Status: ${isBlocked ? "Blocked :red_circle:" : "Ready to merge :green_circle:"}\n`;
	result += "### Issues blocking this PR: \n";
	for (issue of blockingIssues) {
		var isOpen = openIssues.includes(issue);
		result += `- #${issue} ${isOpen ? ":red_circle:" : ":green_circle:"}\n`;
	}
	result += "----\n";
	result += signature;
	return result;
}

module.exports = {getBlockingIssues, getCommentText, signature}