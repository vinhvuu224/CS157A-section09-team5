package com.CS157Ateam5.server;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
public class IssueController {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @CrossOrigin
    @GetMapping(value="/issues")
    public @ResponseBody Object getIssues(@RequestParam String project_id) {
        String query = "select issues.issue_id, issues.name, issues.description, issues.priority_level from issues " +
                "join haveissues using (issue_id) join projects using (project_id)" + " where project_id="+project_id+";";

        List<Issues> issues = new ArrayList<>();
        List<Map<String, Object>> rows = jdbcTemplate.queryForList(query);
        for (Map row : rows) {
            Issues issue = new Issues((int) row.get("issue_id"), (String) row.get("name"),
                    (String) row.get("description"), (String) row.get("priority_level"));
            issues.add(issue);
        }
        return issues;
    }

    @PostMapping(value="/issues")
    public @ResponseBody String addNewEntry(@RequestBody Issues issue) {
            jdbcTemplate.update("INSERT INTO issues(name, description, priority_level) values('" + issue.getName() + "', '"
                    + issue.getDescription() + "', '"+issue.getPriorityLevel()+"');");
        return "Successful";
    }

    /*
        Provide parameter name to be changed and the new value when sending request
     */
    @PatchMapping(value="/issues")
    public @ResponseBody String updateEntry(@RequestParam long issue_id, @RequestParam String param_name,
                                            @RequestParam Object param_value) {
        String taskUpdateQuery = "UPDATE issues SET " + param_name + " = '" + param_value + "' WHERE issue_id="+issue_id+";";
        jdbcTemplate.update(taskUpdateQuery);
        return "Success";
    }

    @DeleteMapping(value="/issues")
    public @ResponseBody String deleteEntry(@RequestParam long issue_id) {
        String issueUpdateQuery = "DELETE FROM issues WHERE issue_id="+issue_id+";";
        jdbcTemplate.update(issueUpdateQuery);
        new HaveIssueController(jdbcTemplate).deleteEntry(0, issue_id);
        return "Success";
    }
}
